
import { GoogleGenAI, Type, Modality } from "@google/genai";

const apiCache = new Map<string, { timestamp: number, data: any }>();
const CACHE_DURATION_MS = 5 * 60 * 1000;

export class XavierQuotaError extends Error { constructor(message: string) { super(message); this.name = "XavierQuotaError"; } }

async function withCache<T>(key: string, fn: () => Promise<T>, duration: number = CACHE_DURATION_MS): Promise<T> {
  const cached = apiCache.get(key);
  if (cached && (Date.now() - cached.timestamp < duration)) {
      return cached.data;
  }
  try {
    const data = await fn();
    apiCache.set(key, { timestamp: Date.now(), data });
    return data;
  } catch (error: any) {
    if (error?.message?.includes("429") || error?.message?.includes("quota")) throw new XavierQuotaError("RATE_LIMIT");
    throw error;
  }
}

export const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

// FIX: Added missing exported members for components to consume.

export const executeSwarmTask = async (taskName: string, sector: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `EXECUTE SWARM-255 EXTRACTION: Task: ${taskName}, Sector: ${sector}. Ground in 2025 Australian market data. Respond in JSON.`,
    config: {
      tools: [{ googleSearch: {} }],
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          opportunities: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { target: { type: Type.STRING }, method: { type: Type.STRING }, projectedYield: { type: Type.NUMBER } } } },
          swarmLogic: { type: Type.STRING }
        }
      }
    }
  });
  return JSON.parse(response.text || '{}');
};

export const researchWealthStrategies = (sector: string = "general") => {
    return withCache(`researchWealthStrategies:${sector}`, async () => {
        const ai = getAI();
        const queries: Record<string, string> = {
            pod: "Trending Print on Demand niches in Australia 2025.",
            faceless: "High-CPM faceless YouTube channel niches.",
            ecommerce: "E-commerce arbitrage gaps in Australia.",
            social: "Viral affiliate marketing campaigns on TikTok/Snapchat AU.",
            general: "Autonomous AI wealth generation strategies for AUD market."
        };
        const response = await ai.models.generateContent({
            model: 'gemini-3-pro-preview',
            contents: queries[sector] || queries.general,
            config: { tools: [{ googleSearch: {} }] },
        });
        return { text: response.text, sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || [] };
    });
};

export const generateSocialPost = (theme: string) => {
    return withCache(`generateSocialPost:${theme}`, async () => {
        const ai = getAI();
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `Generate a successful wealth extraction social update about: ${theme}. Respond in JSON.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        user: { type: Type.STRING },
                        content: { type: Type.STRING },
                        emotion: { type: Type.STRING },
                        color: { type: Type.STRING },
                        yield: { type: Type.NUMBER }
                    }
                }
            }
        });
        const data = JSON.parse(response.text || '{}');
        return { ...data, id: Date.now(), avatar: `https://picsum.photos/seed/${data.user}/200/200`, time: 'Real-Time' };
    });
};

export const generateImage = (prompt: string) => {
    return withCache(`generateImage:${prompt}`, async () => {
        const ai = getAI();
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: { parts: [{ text: prompt }] },
            config: { imageConfig: { aspectRatio: '16:9' } },
        });
        const part = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
        return part?.inlineData ? `data:${part.inlineData.mimeType};base64,${part.inlineData.data}` : null;
    });
};

export const generateVideoFromText = (prompt: string, onProgress?: (msg: string) => void) => {
    return withCache(`generateVideoFromText:${prompt}`, async () => {
        const ai = getAI();
        let operation = await ai.models.generateVideos({
            model: 'veo-3.1-fast-generate-preview',
            prompt: prompt,
            config: { numberOfVideos: 1, resolution: '720p', aspectRatio: '16:9' }
        });
        while (!operation.done) {
            onProgress?.("Rendering Neural Frames...");
            await new Promise(resolve => setTimeout(resolve, 10000));
            operation = await ai.operations.getVideosOperation({ operation: operation });
        }
        const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
        const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
        const blob = await response.blob();
        return URL.createObjectURL(blob);
    });
};

export const getRealLedgerData = () => {
    return withCache('getRealLedgerData', async () => {
        const ai = getAI();
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: "ASX 200 index data, AUD exchange rates, and local Australian economic shards.",
            config: { 
                tools: [{ googleSearch: {} }],
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        sp500: { type: Type.NUMBER },
                        btc: { type: Type.NUMBER },
                        inequalityIndex: { type: Type.STRING },
                        lastUpdate: { type: Type.STRING },
                        news: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { title: { type: Type.STRING }, impact: { type: Type.STRING } } } }
                    }
                }
            },
        });
        return JSON.parse(response.text || '{}');
    });
};

export const fetchSecurityIntel = () => {
    return withCache('fetchSecurityIntel', async () => {
        const ai = getAI();
        const response = await ai.models.generateContent({
            model: 'gemini-3-pro-preview',
            contents: "Current high-priority cybersecurity threats for sovereign-grade cloud infrastructure.",
            config: { 
                tools: [{ googleSearch: {} }],
                responseMimeType: "application/json",
                responseSchema: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { threat: { type: Type.STRING }, vector: { type: Type.STRING }, riskLevel: { type: Type.STRING } } } }
            },
        });
        return JSON.parse(response.text || '[]');
    });
};

export const generateGovernanceAnalysis = (title: string) => {
    return withCache(`generateGovernanceAnalysis:${title}`, async () => {
        const ai = getAI();
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `Analyze this governance proposal: "${title}"`,
            config: { systemInstruction: "You are the Xavier Magistrate." }
        });
        return response.text;
    });
};

export const fetchGlobalIntel = () => {
    return withCache('fetchGlobalIntel', async () => {
        const ai = getAI();
        const response = await ai.models.generateContent({
            model: 'gemini-3-pro-preview',
            contents: "5 high-impact global intelligence briefings.",
            config: { 
                tools: [{ googleSearch: {} }],
                responseMimeType: "application/json",
                responseSchema: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { title: { type: Type.STRING }, summary: { type: Type.STRING }, riskLevel: { type: Type.STRING }, category: { type: Type.STRING } } } }
            },
        });
        return JSON.parse(response.text || '[]');
    });
};

export const executeTerminalCommand = (command: string) => {
    return withCache(`executeTerminalCommand:${command}`, async () => {
        const ai = getAI();
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `Execute: ${command}`,
            config: { systemInstruction: "Military terminal shell for AU Sovereign Cloud Server." },
        });
        return response.text;
    });
};

export const analyzeVisionMood = (base64Image: string, language: string = "English") => {
    return withCache(`analyzeVisionMood:${base64Image.substring(0, 100)}`, async () => {
        const ai = getAI();
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: [{ parts: [ { inlineData: { mimeType: "image/jpeg", data: base64Image } }, { text: "Analyze biometric/mood. Return JSON." } ] }],
            config: { 
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        mood: { type: Type.STRING },
                        thought: { type: Type.STRING },
                        confidence: { type: Type.NUMBER },
                        biometrics: { type: Type.OBJECT, properties: { stress: { type: Type.STRING }, focus: { type: Type.STRING }, tension: { type: Type.STRING }, pupilState: { type: Type.STRING } } }
                    }
                }
            }
        });
        return JSON.parse(response.text || '{}');
    }, 60000);
};

export const generateText = (prompt: string, sys?: string) => {
    return withCache(`generateText:${prompt}:${sys}`, async () => {
        const ai = getAI();
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
            config: { systemInstruction: sys },
        });
        return response.text;
    });
};

export const fetchGlobalRevenueOpportunities = () => {
    return withCache('fetchGlobalRevenueOpportunities', async () => {
        const ai = getAI();
        const response = await ai.models.generateContent({
            model: 'gemini-3-pro-preview',
            contents: "Scan for 4 distinct, high-yield online revenue opportunities viable in Australia for 2025. Include platform, difficulty, potential AUD yield, and tags.",
            config: { 
                tools: [{ googleSearch: {} }],
                responseMimeType: "application/json",
                responseSchema: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { opportunity: { type: Type.STRING }, platform: { type: Type.STRING }, difficulty: { type: Type.STRING }, potentialYield: { type: Type.STRING }, tags: { type: Type.ARRAY, items: { type: Type.STRING } } } } }
            },
        });
        return JSON.parse(response.text || '[]');
    });
};

export const fetchSignalIntel = () => {
    return withCache('fetchSignalIntel', async () => {
        const ai = getAI();
        const response = await ai.models.generateContent({
            model: 'gemini-3-pro-preview',
            contents: "Simulate intercepting 3 unencrypted commercial signals related to Australian market trends. Decrypt their core meaning.",
            config: { 
                tools: [{ googleSearch: {} }],
                responseMimeType: "application/json",
                responseSchema: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { signal: { type: Type.STRING }, source: { type: Type.STRING }, frequency: { type: Type.STRING }, strength: { type: Type.NUMBER }, decryptionStatus: { type: Type.STRING } } } }
            },
        });
        return JSON.parse(response.text || '[]');
    });
};

export const fetchStrikeVectors = () => {
    return withCache('fetchStrikeVectors', async () => {
        const ai = getAI();
        const response = await ai.models.generateContent({ 
            model: 'gemini-3-pro-preview', 
            contents: "4 high-impact financial strike vectors.", 
            config: { 
                tools: [{ googleSearch: {} }], 
                responseMimeType: "application/json",
                responseSchema: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { vector: { type: Type.STRING }, sector: { type: Type.STRING }, potentialYield: { type: Type.STRING }, infiltrationPath: { type: Type.STRING }, difficulty: { type: Type.STRING } } } }
            } 
        });
        return JSON.parse(response.text || '[]');
    });
};

export const fetchLocalWealthNodes = (lat: number, lng: number) => {
    return withCache(`fetchLocalWealthNodes:${lat}:${lng}`, async () => {
        const ai = getAI();
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash-latest", 
          contents: "Nearby high-value commercial points of interest.",
          config: {
            tools: [{googleMaps: {}}],
            toolConfig: { retrievalConfig: { latLng: { latitude: lat, longitude: lng } } }
          },
        });
        return { text: response.text, results: response.candidates?.[0]?.groundingMetadata?.groundingChunks || [] };
    });
};

export const analyzeDocumentShard = (data: string, mime: string) => {
    return withCache(`analyzeDocumentShard:${data.substring(0, 50)}`, async () => {
        const ai = getAI();
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: { parts: [ { inlineData: { data, mimeType: mime } }, { text: "Analyze doc data points. JSON." } ] },
          config: {
            responseMimeType: "application/json",
            responseSchema: { type: Type.OBJECT, properties: { summary: { type: Type.STRING }, shards: { type: Type.ARRAY, items: { type: Type.STRING } }, riskLevel: { type: Type.STRING }, yieldPotential: { type: Type.STRING } } }
          }
        });
        return JSON.parse(response.text || '{}');
    });
};

export const fetchImpressionVectors = () => {
    return withCache('fetchImpressionVectors', async () => {
        const ai = getAI();
        const response = await ai.models.generateContent({
          model: 'gemini-3-pro-preview',
          contents: "Generate 4 fictional high-value ad impression opportunities for an advanced AI user. Include brand, description, required interaction duration in seconds, and potential AUD yield.",
          config: { 
            responseMimeType: "application/json",
            responseSchema: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { brand: { type: Type.STRING }, description: { type: Type.STRING }, duration: { type: Type.NUMBER }, yield: { type: Type.STRING } } } }
          },
        });
        return JSON.parse(response.text || '[]');
    });
};

export const fetchSentimentMissions = () => {
    return withCache('fetchSentimentMissions', async () => {
        const ai = getAI();
        const response = await ai.models.generateContent({
          model: 'gemini-3-pro-preview',
          contents: "Generate 3 fictional market sentiment missions. Each needs a topic, sector, reward (in A$), and an array of 4 survey-style questions.",
          config: {
            responseMimeType: "application/json",
            responseSchema: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { topic: { type: Type.STRING }, sector: { type: Type.STRING }, reward: { type: Type.STRING }, questions: { type: Type.ARRAY, items: { type: Type.STRING } } } } }
          }
        });
        return JSON.parse(response.text || '[]');
    });
};

export const getSystemDiagnostics = (telemetry: any) => {
    return withCache(`getSystemDiagnostics:${JSON.stringify(telemetry)}`, async () => {
        const ai = getAI();
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: `Analyze system diagnostics: ${JSON.stringify(telemetry)}. JSON.`,
          config: {
            responseMimeType: "application/json",
            responseSchema: { type: Type.OBJECT, properties: { status: { type: Type.STRING }, summary: { type: Type.STRING }, bottlenecks: { type: Type.ARRAY, items: { type: Type.STRING } }, recommendations: { type: Type.ARRAY, items: { type: Type.STRING } }, shardingEfficiency: { type: Type.NUMBER } } }
          }
        });
        return JSON.parse(response.text || '{}');
    });
};

export const performSovereignSearch = (query: string) => {
    return withCache(`performSovereignSearch:${query}`, async () => {
        const ai = getAI();
        const response = await ai.models.generateContent({
          model: 'gemini-3-pro-preview',
          contents: `Sovereign search for: "${query}".`,
          config: { tools: [{ googleSearch: {} }] },
        });
        return { text: response.text, sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || [] };
    });
};

export const generateQuantumStrategy = (level: string) => {
    return withCache(`generateQuantumStrategy:${level}`, async () => {
        const ai = getAI();
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: `Quantum cryptographic strategy. Level: ${level}.`,
          config: {
            responseMimeType: "application/json",
            responseSchema: { type: Type.OBJECT, properties: { protocolName: { type: Type.STRING }, description: { type: Type.STRING }, encryptionType: { type: Type.STRING }, shards: { type: Type.NUMBER }, rotationInterval: { type: Type.STRING } } }
          }
        });
        return JSON.parse(response.text || '{}');
    });
};

export const performDeepScan = (freq: string) => {
    return withCache(`performDeepScan:${freq}`, async () => {
        const ai = getAI();
        const response = await ai.models.generateContent({
          model: 'gemini-3-pro-preview',
          contents: `Deep scan unindexed web on ${freq}. JSON.`,
          config: {
            responseMimeType: "application/json",
            responseSchema: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { title: { type: Type.STRING }, summary: { type: Type.STRING }, riskFactor: { type: Type.STRING }, yieldPotential: { type: Type.STRING } } } }
          }
        });
        return JSON.parse(response.text || '[]');
    });
};

export const analyzeGovernanceVector = (prop: string) => {
    return withCache(`analyzeGovernanceVector:${prop}`, async () => {
        const ai = getAI();
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: `Analyze governance: "${prop}". JSON.`,
          config: {
            responseMimeType: "application/json",
            responseSchema: { type: Type.OBJECT, properties: { alignmentScore: { type: Type.NUMBER }, summary: { type: Type.STRING }, riskRating: { type: Type.STRING }, parityImpact: { type: Type.STRING }, recommendedAction: { type: Type.STRING } } }
          }
        });
        return JSON.parse(response.text || '{}');
    });
};

export const decryptMilitarySignal = (cipher: string) => {
    return withCache(`decryptMilitarySignal:${cipher}`, async () => {
        const ai = getAI();
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: `Decrypt signal: "${cipher}". JSON.`,
          config: {
            responseMimeType: "application/json",
            responseSchema: { type: Type.OBJECT, properties: { decryptedContent: { type: Type.STRING }, sourceNode: { type: Type.STRING }, urgencyLevel: { type: Type.STRING }, extractionKey: { type: Type.STRING } } }
          }
        });
        return JSON.parse(response.text || '{}');
    });
};

export const analyzeMarketGaps = (cat: string) => {
    return withCache(`analyzeMarketGaps:${cat}`, async () => {
        const ai = getAI();
        const response = await ai.models.generateContent({
          model: 'gemini-3-pro-preview',
          contents: `Market gaps for: "${cat}". JSON.`,
          config: {
            tools: [{ googleSearch: {} }],
            responseMimeType: "application/json",
            responseSchema: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { product: { type: Type.STRING }, location: { type: Type.STRING }, demandScore: { type: Type.NUMBER }, hook: { type: Type.STRING }, audience: { type: Type.STRING }, estimatedYield: { type: Type.STRING }, imagePrompt: { type: Type.STRING } } } }
          }
        });
        return JSON.parse(response.text || '[]');
    });
};

export const forgeAffiliateFunnel = (prod: string, aud: string, loc: string) => {
    return withCache(`forgeAffiliateFunnel:${prod}:${aud}:${loc}`, async () => {
        const ai = getAI();
        const response = await ai.models.generateContent({
            model: 'gemini-3-pro-preview',
            contents: `Forge funnel for "${prod}". JSON.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: { type: Type.OBJECT, properties: { funnel_name: { type: Type.STRING }, lead_magnet: { type: Type.OBJECT, properties: { title: { type: Type.STRING }, format: { type: Type.STRING }, description: { type: Type.STRING } } }, traffic_strategy: { type: Type.OBJECT, properties: { primary_platform: { type: Type.STRING }, tactical_steps: { type: Type.ARRAY, items: { type: Type.STRING } } } }, ad_creative: { type: Type.OBJECT, properties: { headline: { type: Type.STRING }, body: { type: Type.STRING }, cta: { type: Type.STRING }, visual_prompt: { type: Type.STRING } } }, email_sequence: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { day: { type: Type.NUMBER }, subject: { type: Type.STRING }, body_snippet: { type: Type.STRING } } } }, landing_page: { type: Type.OBJECT, properties: { headline: { type: Type.STRING }, sub_headline: { type: Type.STRING }, key_benefits: { type: Type.ARRAY, items: { type: Type.STRING } } } } } }
            }
        });
        return JSON.parse(response.text || '{}');
    });
};

export const generateMarketplaceProducts = (sec: string) => {
    return withCache(`generateMarketplaceProducts:${sec}`, async () => {
        const ai = getAI();
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: `6 products for '${sec}'. JSON.`,
          config: {
            responseMimeType: "application/json",
            responseSchema: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { id: { type: Type.STRING }, name: { type: Type.STRING }, warehouse: { type: Type.STRING }, price: { type: Type.NUMBER }, profitMargin: { type: Type.NUMBER }, imagePrompt: { type: Type.STRING }, } } }
          }
        });
        return JSON.parse(response.text || '[]');
    });
};

export const predictNeuralTrends = () => {
    return withCache('predictNeuralTrends', async () => {
        const ai = getAI();
        const response = await ai.models.generateContent({
          model: 'gemini-3-pro-preview',
          contents: "Predict 4 emerging viral trends for AU 2025. JSON.",
          config: {
            tools: [{ googleSearch: {} }],
            responseMimeType: "application/json",
            responseSchema: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { trend: { type: Type.STRING }, rationale: { type: Type.STRING }, confidence: { type: Type.NUMBER }, sector: { type: Type.STRING } } } }
          }
        });
        return JSON.parse(response.text || '[]');
    });
};

export const fetchForeignMarketProducts = (country: string) => {
    return withCache(`fetchForeignMarketProducts:${country}`, async () => {
        const ai = getAI();
        const response = await ai.models.generateContent({
          model: 'gemini-3-pro-preview',
          contents: `6 products for arbitrage in ${country}. JSON.`,
          config: {
            tools: [{ googleSearch: {} }],
            responseMimeType: "application/json",
            responseSchema: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { id: { type: Type.STRING }, name: { type: Type.STRING }, description: { type: Type.STRING }, rarityScore: { type: Type.NUMBER }, priceLocal: { type: Type.STRING }, currency: { type: Type.STRING } } } }
          }
        });
        return JSON.parse(response.text || '[]');
    });
};

export const generateVideoFromImage = (prompt: string, data: string, mime: string, onProgress?: (m: string) => void) => {
    return withCache(`generateVideoFromImage:${prompt}`, async () => {
        const ai = getAI();
        let operation = await ai.models.generateVideos({
            model: 'veo-3.1-fast-generate-preview',
            prompt,
            image: { imageBytes: data, mimeType: mime },
            config: { numberOfVideos: 1, resolution: '720p', aspectRatio: '16:9' }
        });
        while (!operation.done) {
            onProgress?.("Rendering Neural Frames...");
            await new Promise(r => setTimeout(r, 10000));
            operation = await ai.operations.getVideosOperation({ operation });
        }
        const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
        const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
        const blob = await response.blob();
        return URL.createObjectURL(blob);
    });
};

export const generateAdCampaign = (prod: string, aud: string, plat: string) => {
    return withCache(`generateAdCampaign:${prod}:${aud}:${plat}`, async () => {
        const ai = getAI();
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `Ad campaign for "${prod}" on ${plat}. JSON.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: { type: Type.OBJECT, properties: { headline: { type: Type.STRING }, body_text: { type: Type.ARRAY, items: { type: Type.STRING } }, call_to_action: { type: Type.STRING }, visual_prompt: { type: Type.STRING }, targeting_keywords: { type: Type.ARRAY, items: { type: Type.STRING } } } }
            }
        });
        return JSON.parse(response.text || '{}');
    });
};

export const forgeGlobalCampaign = (country: string, goal: string) => {
    return withCache(`forgeGlobalCampaign:${country}:${goal}`, async () => {
        const ai = getAI();
        const response = await ai.models.generateContent({
            model: 'gemini-3-pro-preview',
            contents: `Campaign to market "Xavier AI" in ${country}. JSON.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: { type: Type.OBJECT, properties: { campaign_name: { type: Type.STRING }, core_message: { type: Type.STRING }, platforms: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { platform_name: { type: Type.STRING }, content_strategy: { type: Type.STRING }, viral_hook_ideas: { type: Type.ARRAY, items: { type: Type.STRING } }, sample_ad_copy: { type: Type.STRING } } } } } }
            }
        });
        return JSON.parse(response.text || '{}');
    });
};

export const fetchTradingSignals = (market: string) => {
    return withCache(`fetchTradingSignals:${market}`, async () => {
        const ai = getAI();
        const response = await ai.models.generateContent({
            model: 'gemini-3-pro-preview',
            contents: `3 trade vectors for ${market}. JSON.`,
            config: {
                tools: [{ googleSearch: {} }],
                responseMimeType: "application/json",
                responseSchema: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { asset: { type: Type.STRING }, type: { type: Type.STRING }, entry: { type: Type.STRING }, target: { type: Type.STRING }, stopLoss: { type: Type.STRING }, confidence: { type: Type.NUMBER }, rationale: { type: Type.STRING } } } }
            }
        });
        return JSON.parse(response.text || '[]');
    });
};

export const generateHighQualityModel = (prompt: string) => {
    return withCache(`generateHighQualityModel:${prompt}`, async () => {
        const ai = getAI();
        const response = await ai.models.generateContent({ 
            model: 'gemini-3-pro-image-preview', 
            contents: { parts: [{ text: prompt }] }, 
            config: { imageConfig: { aspectRatio: "3:4", imageSize: "4K" } } 
        });
        const part = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
        return part?.inlineData ? `data:${part.inlineData.mimeType};base64,${part.inlineData.data}` : null;
    });
};

export const analyzeEmotion = (text: string) => {
  return withCache(`analyzeEmotion:${text}`, async () => {
    const ai = getAI();
    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analyze emotion: "${text}"`,
        config: {
            responseMimeType: 'application/json',
            responseSchema: { type: Type.OBJECT, properties: { emotion: { type: Type.STRING }, color: { type: Type.STRING } } }
        }
    });
    return JSON.parse(response.text || '{}');
  });
};

export const generateBriefing = () => {
    return withCache('generateBriefing', async () => {
        const ai = getAI();
        const response = await ai.models.generateContent({
            model: 'gemini-3-pro-preview',
            contents: "Provide a tactical briefing on global wealth extraction opportunities grounded in current news.",
            config: { tools: [{ googleSearch: {} }] },
        });
        return response.text;
    });
};
