(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/_a24de8._.js", {

"[project]/app/services/transcriptionService.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "TranscriptionService": (()=>TranscriptionService)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$google$2f$generative$2d$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@google/generative-ai/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
;
const genAI = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$google$2f$generative$2d$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GoogleGenerativeAI"](("TURBOPACK compile-time value", "AIzaSyBE_d4CulcTfFyeiIdUO41ZOGVmWMe1HeI") || '');
const MODEL_NAME = "gemini-1.5-flash-8b";
class TranscriptionService {
    model;
    constructor(){
        this.model = genAI.getGenerativeModel({
            model: MODEL_NAME
        });
    }
    async transcribeAudio(audioBase64, mimeType = "audio/wav") {
        try {
            const result = await this.model.generateContent([
                {
                    inlineData: {
                        mimeType: mimeType,
                        data: audioBase64
                    }
                },
                {
                    text: "Please transcribe the spoken language in this audio accurately. Ignore any background noise or non-speech sounds."
                }
            ]);
            return result.response.text();
        } catch (error) {
            console.error("Transcription error:", error);
            throw error;
        }
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/utils/audioUtils.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
// Helper function to download and analyze WAV data
// function debugSaveWav(wavData: string, filename: string = 'debug.wav') {
//   const byteString = atob(wavData);
//   const bytes = new Uint8Array(byteString.length);
//   for (let i = 0; i < byteString.length; i++) {
//     bytes[i] = byteString.charCodeAt(i);
//   }
//   // Create blob and download for test
//   const blob = new Blob([bytes], { type: 'audio/wav' });
//   const url = URL.createObjectURL(blob);
//   const a = document.createElement('a');
//   a.href = url;
//   a.download = filename;
//   document.body.appendChild(a);
//   a.click();
//   document.body.removeChild(a);
//   URL.revokeObjectURL(url);
// }
__turbopack_esm__({
    "pcmToWav": (()=>pcmToWav)
});
function pcmToWav(pcmData, sampleRate = 24000) {
    return new Promise((resolve, reject)=>{
        try {
            // Decode base64 PCM data
            const binaryString = atob(pcmData);
            const pcmBytes = new Uint8Array(binaryString.length);
            for(let i = 0; i < binaryString.length; i++){
                pcmBytes[i] = binaryString.charCodeAt(i);
            }
            // Convert bytes to samples (assuming 16-bit PCM)
            const samples = new Int16Array(pcmBytes.buffer);
            // Create WAV header
            const wavHeader = new ArrayBuffer(44);
            const view = new DataView(wavHeader);
            const pcmByteLength = samples.length * 2; // 16-bit = 2 bytes per sample
            // "RIFF" chunk descriptor
            view.setUint8(0, 'R'.charCodeAt(0));
            view.setUint8(1, 'I'.charCodeAt(0));
            view.setUint8(2, 'F'.charCodeAt(0));
            view.setUint8(3, 'F'.charCodeAt(0));
            // File length (header size + data size)
            view.setUint32(4, 36 + pcmByteLength, true);
            // "WAVE" format
            view.setUint8(8, 'W'.charCodeAt(0));
            view.setUint8(9, 'A'.charCodeAt(0));
            view.setUint8(10, 'V'.charCodeAt(0));
            view.setUint8(11, 'E'.charCodeAt(0));
            // "fmt " sub-chunk
            view.setUint8(12, 'f'.charCodeAt(0));
            view.setUint8(13, 'm'.charCodeAt(0));
            view.setUint8(14, 't'.charCodeAt(0));
            view.setUint8(15, ' '.charCodeAt(0));
            // Sub-chunk size
            view.setUint32(16, 16, true);
            // Audio format (PCM = 1)
            view.setUint16(20, 1, true);
            // Number of channels
            view.setUint16(22, 1, true);
            // Sample rate
            view.setUint32(24, sampleRate, true);
            // Byte rate
            view.setUint32(28, sampleRate * 2, true);
            // Block align
            view.setUint16(32, 2, true);
            // Bits per sample
            view.setUint16(34, 16, true);
            // "data" sub-chunk
            view.setUint8(36, 'd'.charCodeAt(0));
            view.setUint8(37, 'a'.charCodeAt(0));
            view.setUint8(38, 't'.charCodeAt(0));
            view.setUint8(39, 'a'.charCodeAt(0));
            // Data size
            view.setUint32(40, pcmByteLength, true);
            // Create final buffer
            const wavBuffer = new ArrayBuffer(wavHeader.byteLength + pcmByteLength);
            const wavBytes = new Uint8Array(wavBuffer);
            // Copy header and PCM data
            wavBytes.set(new Uint8Array(wavHeader), 0);
            wavBytes.set(new Uint8Array(samples.buffer), wavHeader.byteLength);
            // Use Blob and FileReader to convert to base64
            const blob = new Blob([
                wavBytes
            ], {
                type: 'audio/wav'
            });
            const reader = new FileReader();
            reader.onloadend = ()=>{
                const base64data = reader.result?.toString().split(',')[1];
                if (base64data) {
                    resolve(base64data);
                } else {
                    reject(new Error("Failed to convert WAV to base64"));
                }
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        } catch (error) {
            reject(error);
        }
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/services/geminiWebSocket.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
// import { Base64 } from 'js-base64';
__turbopack_esm__({
    "GeminiWebSocket": (()=>GeminiWebSocket)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$transcriptionService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/app/services/transcriptionService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$audioUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/app/utils/audioUtils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
;
;
const MODEL = "models/gemini-2.0-flash-exp";
const API_KEY = ("TURBOPACK compile-time value", "AIzaSyBE_d4CulcTfFyeiIdUO41ZOGVmWMe1HeI");
const HOST = "generativelanguage.googleapis.com";
const WS_URL = `wss://${HOST}/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent?key=${API_KEY}`;
async function setLightValues(brightness, colorTemp) {
    return {
        brightness,
        colorTemperature: colorTemp
    };
}
// Add proper type for postal_code
async function fetchDoctors(postal_code) {
    try {
        const res = await fetch('/api/nppes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                postal_code: postal_code
            })
        });
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        return data;
    } catch (err) {
        console.log(err);
    }
}
const fetchDoctorsDeclaration = {
    name: "getDoctorsFromPostalCode",
    parameters: {
        type: "OBJECT",
        description: "fetch the doctors from a specific postal code",
        properties: {
            postal_code: {
                type: "NUMBER",
                description: "fetch the doctors from this postal code"
            }
        },
        required: [
            "postal_code"
        ]
    }
};
const controlLightFunctionDeclaration = {
    name: "controlLight",
    parameters: {
        type: "OBJECT",
        description: "Set the brightness and color temperature of a room light.",
        properties: {
            brightness: {
                type: "NUMBER",
                description: "Light level from 0 to 100. Zero is off and 100 is full brightness."
            },
            colorTemperature: {
                type: "STRING",
                description: "Color temperature of the light fixture which can be `daylight`, `cool` or `warm`."
            }
        },
        required: [
            "brightness",
            "colorTemperature"
        ]
    }
};
const functions = {
    controlLight: ({ brightness, colorTemperature })=>{
        return setLightValues(brightness, colorTemperature);
    },
    getDoctorsFromPostalCode: ({ postal_code })=>{
        return fetchDoctors(postal_code);
    }
};
class GeminiWebSocket {
    ws = null;
    isConnected = false;
    isSetupComplete = false;
    onMessageCallback = null;
    onSetupCompleteCallback = null;
    audioContext = null;
    // Audio queue management
    audioQueue = [];
    isPlaying = false;
    currentSource = null;
    isPlayingResponse = false;
    onPlayingStateChange = null;
    onAudioLevelChange = null;
    onTranscriptionCallback = null;
    transcriptionService;
    accumulatedPcmData = [];
    constructor(onMessage, onSetupComplete, onPlayingStateChange, onAudioLevelChange, onTranscription){
        this.onMessageCallback = onMessage;
        this.onSetupCompleteCallback = onSetupComplete;
        this.onPlayingStateChange = onPlayingStateChange;
        this.onAudioLevelChange = onAudioLevelChange;
        this.onTranscriptionCallback = onTranscription;
        // Create AudioContext for playback
        this.audioContext = new AudioContext({
            sampleRate: 24000 // Match the response audio rate
        });
        this.transcriptionService = new __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$transcriptionService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TranscriptionService"]();
    }
    connect() {
        if (this.ws?.readyState === WebSocket.OPEN) {
            return;
        }
        this.ws = new WebSocket(WS_URL);
        this.ws.onopen = ()=>{
            this.isConnected = true;
            this.sendInitialSetup();
        };
        this.ws.onmessage = async (event)=>{
            try {
                let messageText;
                if (event.data instanceof Blob) {
                    const arrayBuffer = await event.data.arrayBuffer();
                    const bytes = new Uint8Array(arrayBuffer);
                    messageText = new TextDecoder('utf-8').decode(bytes);
                } else {
                    messageText = event.data;
                }
                await this.handleMessage(messageText);
            } catch (error) {
                console.error("[WebSocket] Error processing message:", error);
            }
        };
        this.ws.onerror = (error)=>{
            console.error("[WebSocket] Error:", error);
        };
        this.ws.onclose = (event)=>{
            this.isConnected = false;
            // Only attempt to reconnect if we haven't explicitly called disconnect
            if (!event.wasClean && this.isSetupComplete) {
                setTimeout(()=>this.connect(), 1000);
            }
        };
    }
    sendInitialSetup() {
        const setupMessage = {
            setup: {
                model: MODEL,
                generation_config: {
                    response_modalities: [
                        "AUDIO"
                    ]
                },
                tools: {
                    functionDeclarations: [
                        controlLightFunctionDeclaration,
                        fetchDoctorsDeclaration
                    ]
                }
            }
        };
        this.ws?.send(JSON.stringify(setupMessage));
    }
    sendMediaChunk(b64Data, mimeType) {
        if (!this.isConnected || !this.ws || !this.isSetupComplete) return;
        const message = {
            realtime_input: {
                media_chunks: [
                    {
                        mime_type: mimeType === "audio/pcm" ? "audio/pcm" : mimeType,
                        data: b64Data
                    }
                ]
            }
        };
        try {
            this.ws.send(JSON.stringify(message));
        } catch (error) {
            console.error("[WebSocket] Error sending media chunk:", error);
        }
    }
    async playAudioResponse(base64Data) {
        if (!this.audioContext) return;
        try {
            // Decode base64 to bytes
            const binaryString = atob(base64Data);
            const bytes = new Uint8Array(binaryString.length);
            for(let i = 0; i < binaryString.length; i++){
                bytes[i] = binaryString.charCodeAt(i);
            }
            // Convert to Int16Array (PCM format)
            const pcmData = new Int16Array(bytes.buffer);
            // Convert to float32 for Web Audio API
            const float32Data = new Float32Array(pcmData.length);
            for(let i = 0; i < pcmData.length; i++){
                float32Data[i] = pcmData[i] / 32768.0;
            }
            // Add to queue and start playing if not already playing
            this.audioQueue.push(float32Data);
            this.playNextInQueue();
        } catch (error) {
            console.error("[WebSocket] Error processing audio:", error);
        }
    }
    async playNextInQueue() {
        if (!this.audioContext || this.isPlaying || this.audioQueue.length === 0) return;
        try {
            this.isPlaying = true;
            this.isPlayingResponse = true;
            this.onPlayingStateChange?.(true);
            const float32Data = this.audioQueue.shift();
            // Calculate audio level
            let sum = 0;
            for(let i = 0; i < float32Data.length; i++){
                sum += Math.abs(float32Data[i]);
            }
            const level = Math.min(sum / float32Data.length * 100 * 5, 100);
            this.onAudioLevelChange?.(level);
            const audioBuffer = this.audioContext.createBuffer(1, float32Data.length, 24000);
            audioBuffer.getChannelData(0).set(float32Data);
            this.currentSource = this.audioContext.createBufferSource();
            this.currentSource.buffer = audioBuffer;
            this.currentSource.connect(this.audioContext.destination);
            this.currentSource.onended = ()=>{
                this.isPlaying = false;
                this.currentSource = null;
                if (this.audioQueue.length === 0) {
                    this.isPlayingResponse = false;
                    this.onPlayingStateChange?.(false);
                }
                this.playNextInQueue();
            };
            this.currentSource.start();
        } catch (error) {
            console.error("[WebSocket] Error playing audio:", error);
            this.isPlaying = false;
            this.isPlayingResponse = false;
            this.onPlayingStateChange?.(false);
            this.currentSource = null;
            this.playNextInQueue();
        }
    }
    stopCurrentAudio() {
        if (this.currentSource) {
            try {
                this.currentSource.stop();
            } catch  {
            // Ignore errors if already stopped
            }
            this.currentSource = null;
        }
        this.isPlaying = false;
        this.isPlayingResponse = false;
        this.onPlayingStateChange?.(false);
        this.audioQueue = []; // Clear queue
    }
    async handleMessage(message) {
        try {
            const messageData = JSON.parse(message);
            console.log("messageData: ", messageData);
            console.log(messageData.toolCall?.functionCalls);
            if (messageData.toolCall?.functionCalls) {
                // If the server sends multiple function calls in an array, handle them all
                for (const funcCall of messageData.toolCall.functionCalls){
                    if (funcCall.name === "controlLight") {
                        const { args, id } = funcCall;
                        // Call our actual JS function with the args
                        const result = await functions.controlLight(args);
                        // Build a response object to send back
                        const responseMessage = {
                            functionResponse: {
                                name: "controlLight",
                                response: result,
                                id
                            }
                        };
                        this.ws?.send(JSON.stringify(responseMessage));
                        console.log("[Tool Response]:", result);
                        // If you only expect one function call at a time, you can return after
                        // processing the first. Otherwise, remove this return if you want to
                        // handle multiple calls in one message.
                        return;
                    } else if (funcCall.name === "getDoctorsFromPostalCode") {
                        const { args, id } = funcCall;
                        const result = await functions.getDoctorsFromPostalCode(args);
                        const responseMessage = {
                            functionResponse: {
                                name: "getDoctorsFromPostalCode",
                                response: result,
                                id
                            }
                        };
                        this.ws?.send(JSON.stringify(responseMessage));
                        console.log("[Tool Response]:", result);
                    }
                }
            }
            if (messageData.setupComplete) {
                this.isSetupComplete = true;
                this.onSetupCompleteCallback?.();
                return;
            }
            // Handle audio data
            if (messageData.serverContent?.modelTurn?.parts) {
                const parts = messageData.serverContent.modelTurn.parts;
                for (const part of parts){
                    if (part.inlineData?.mimeType === "audio/pcm;rate=24000") {
                        this.accumulatedPcmData.push(part.inlineData.data);
                        this.playAudioResponse(part.inlineData.data);
                    }
                }
            }
            // Handle turn completion separately
            if (messageData.serverContent?.turnComplete === true) {
                if (this.accumulatedPcmData.length > 0) {
                    try {
                        const fullPcmData = this.accumulatedPcmData.join('');
                        const wavData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$audioUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pcmToWav"])(fullPcmData, 24000);
                        const transcription = await this.transcriptionService.transcribeAudio(wavData, "audio/wav");
                        console.log("[Transcription]:", transcription);
                        this.onTranscriptionCallback?.(transcription);
                        this.accumulatedPcmData = []; // Clear accumulated data
                    } catch (error) {
                        console.error("[WebSocket] Transcription error:", error);
                    }
                }
            }
        } catch (error) {
            console.error("[WebSocket] Error parsing message:", error);
        }
    }
    disconnect() {
        this.isSetupComplete = false;
        if (this.ws) {
            this.ws.close(1000, "Intentional disconnect");
            this.ws = null;
        }
        this.isConnected = false;
        this.accumulatedPcmData = [];
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/hooks/useMediaCapture.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "useMediaCapture": (()=>useMediaCapture)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$geminiWebSocket$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/app/services/geminiWebSocket.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$base64$2f$base64$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/js-base64/base64.mjs [app-client] (ecmascript)");
var _s = __turbopack_refresh__.signature();
;
;
;
const useMediaCapture = (onTranscription)=>{
    _s();
    const videoRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const audioContextRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [isStreaming, setIsStreaming] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [stream, setStream] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [audioLevel, setAudioLevel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const geminiWsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const videoCanvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const audioWorkletNodeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [isAudioSetup, setIsAudioSetup] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const setupInProgressRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const [isWebSocketReady, setIsWebSocketReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const imageIntervalRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [isModelSpeaking, setIsModelSpeaking] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [outputAudioLevel, setOutputAudioLevel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [connectionStatus, setConnectionStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('disconnected');
    const [isAudioOnly, setIsAudioOnly] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const cleanupAudio = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useMediaCapture.useCallback[cleanupAudio]": ()=>{
            if (audioWorkletNodeRef.current) {
                audioWorkletNodeRef.current.disconnect();
                audioWorkletNodeRef.current = null;
            }
            if (audioContextRef.current) {
                audioContextRef.current.close();
                audioContextRef.current = null;
            }
        }
    }["useMediaCapture.useCallback[cleanupAudio]"], []);
    const cleanupWebSocket = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useMediaCapture.useCallback[cleanupWebSocket]": ()=>{
            if (geminiWsRef.current) {
                geminiWsRef.current.disconnect();
                geminiWsRef.current = null;
            }
        }
    }["useMediaCapture.useCallback[cleanupWebSocket]"], []);
    const sendAudioData = (b64Data)=>{
        if (!geminiWsRef.current) return;
        geminiWsRef.current.sendMediaChunk(b64Data, "audio/pcm");
    };
    const startAudioOnly = async ()=>{
        if (isStreaming) return;
        try {
            const audioStream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    sampleRate: 16000,
                    channelCount: 1,
                    echoCancellation: true,
                    autoGainControl: true,
                    noiseSuppression: true
                }
            });
            audioContextRef.current = new AudioContext({
                sampleRate: 16000
            });
            setStream(audioStream);
            setIsStreaming(true);
            setIsAudioOnly(true);
        } catch (err) {
            console.error('Error accessing audio device:', err);
            cleanupAudio();
        }
    };
    const toggleAudio = async ()=>{
        if (isStreaming) {
            setIsStreaming(false);
            cleanupWebSocket();
            cleanupAudio();
            if (stream) {
                stream.getTracks().forEach((track)=>track.stop());
            }
            if (videoRef.current) {
                videoRef.current.srcObject = null;
            }
            setStream(null);
            setIsAudioOnly(false);
        } else {
            await startAudioOnly();
        }
    };
    const toggleCamera = async ()=>{
        if (isStreaming && stream) {
            setIsStreaming(false);
            cleanupWebSocket();
            cleanupAudio();
            stream.getTracks().forEach((track)=>track.stop());
            if (videoRef.current) {
                videoRef.current.srcObject = null;
            }
            setStream(null);
            setIsAudioOnly(false);
        } else {
            try {
                const videoStream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: false
                });
                const audioStream = await navigator.mediaDevices.getUserMedia({
                    audio: {
                        sampleRate: 16000,
                        channelCount: 1,
                        echoCancellation: true,
                        autoGainControl: true,
                        noiseSuppression: true
                    }
                });
                audioContextRef.current = new AudioContext({
                    sampleRate: 16000
                });
                if (videoRef.current) {
                    videoRef.current.srcObject = videoStream;
                    videoRef.current.muted = true;
                }
                const combinedStream = new MediaStream([
                    ...videoStream.getTracks(),
                    ...audioStream.getTracks()
                ]);
                setStream(combinedStream);
                setIsStreaming(true);
                setIsAudioOnly(false);
            } catch (err) {
                console.error('Error accessing media devices:', err);
                cleanupAudio();
            }
        }
    };
    const captureAndSendImage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useMediaCapture.useCallback[captureAndSendImage]": ()=>{
            if (!videoRef.current || !videoCanvasRef.current || !geminiWsRef.current) return;
            const canvas = videoCanvasRef.current;
            const context = canvas.getContext('2d');
            if (!context) return;
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            context.drawImage(videoRef.current, 0, 0);
            const imageData = canvas.toDataURL('image/jpeg', 0.8);
            const b64Data = imageData.split(',')[1];
            geminiWsRef.current.sendMediaChunk(b64Data, "image/jpeg");
        }
    }["useMediaCapture.useCallback[captureAndSendImage]"], []);
    // WebSocket connection effect
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useMediaCapture.useEffect": ()=>{
            if (!isStreaming) {
                setConnectionStatus('disconnected');
                return;
            }
            setConnectionStatus('connecting');
            geminiWsRef.current = new __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$services$2f$geminiWebSocket$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GeminiWebSocket"]({
                "useMediaCapture.useEffect": (text)=>{
                    console.log("Received from Gemini:", text);
                }
            }["useMediaCapture.useEffect"], {
                "useMediaCapture.useEffect": ()=>{
                    console.log("[Camera] WebSocket setup complete, starting media capture");
                    setIsWebSocketReady(true);
                    setConnectionStatus('connected');
                }
            }["useMediaCapture.useEffect"], {
                "useMediaCapture.useEffect": (isPlaying)=>{
                    setIsModelSpeaking(isPlaying);
                }
            }["useMediaCapture.useEffect"], {
                "useMediaCapture.useEffect": (level)=>{
                    setOutputAudioLevel(level);
                }
            }["useMediaCapture.useEffect"], onTranscription);
            geminiWsRef.current.connect();
            return ({
                "useMediaCapture.useEffect": ()=>{
                    if (imageIntervalRef.current) {
                        clearInterval(imageIntervalRef.current);
                        imageIntervalRef.current = null;
                    }
                    cleanupWebSocket();
                    setIsWebSocketReady(false);
                    setConnectionStatus('disconnected');
                }
            })["useMediaCapture.useEffect"];
        }
    }["useMediaCapture.useEffect"], [
        isStreaming,
        onTranscription,
        cleanupWebSocket
    ]);
    // Image capture interval effect
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useMediaCapture.useEffect": ()=>{
            if (!isStreaming || !isWebSocketReady) return;
            console.log("[Camera] Starting image capture interval");
            imageIntervalRef.current = setInterval(captureAndSendImage, 1000);
            return ({
                "useMediaCapture.useEffect": ()=>{
                    if (imageIntervalRef.current) {
                        clearInterval(imageIntervalRef.current);
                        imageIntervalRef.current = null;
                    }
                }
            })["useMediaCapture.useEffect"];
        }
    }["useMediaCapture.useEffect"], [
        isStreaming,
        isWebSocketReady,
        captureAndSendImage
    ]);
    // Audio processing setup effect
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useMediaCapture.useEffect": ()=>{
            if (!isStreaming || !stream || !audioContextRef.current || !isWebSocketReady || isAudioSetup || setupInProgressRef.current) {
                return;
            }
            let isActive = true;
            setupInProgressRef.current = true;
            const setupAudioProcessing = {
                "useMediaCapture.useEffect.setupAudioProcessing": async ()=>{
                    try {
                        const ctx = audioContextRef.current;
                        if (!ctx || ctx.state === 'closed' || !isActive) {
                            setupInProgressRef.current = false;
                            return;
                        }
                        if (ctx.state === 'suspended') {
                            await ctx.resume();
                        }
                        await ctx.audioWorklet.addModule('/worklets/audio-processor.js');
                        if (!isActive) {
                            setupInProgressRef.current = false;
                            return;
                        }
                        audioWorkletNodeRef.current = new AudioWorkletNode(ctx, 'audio-processor', {
                            numberOfInputs: 1,
                            numberOfOutputs: 1,
                            processorOptions: {
                                sampleRate: 16000,
                                bufferSize: 4096
                            },
                            channelCount: 1,
                            channelCountMode: 'explicit',
                            channelInterpretation: 'speakers'
                        });
                        const source = ctx.createMediaStreamSource(stream);
                        audioWorkletNodeRef.current.port.onmessage = ({
                            "useMediaCapture.useEffect.setupAudioProcessing": (event)=>{
                                if (!isActive || isModelSpeaking) return;
                                const { pcmData, level } = event.data;
                                setAudioLevel(level);
                                const pcmArray = new Uint8Array(pcmData);
                                const b64Data = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$base64$2f$base64$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Base64"].fromUint8Array(pcmArray);
                                sendAudioData(b64Data);
                            }
                        })["useMediaCapture.useEffect.setupAudioProcessing"];
                        source.connect(audioWorkletNodeRef.current);
                        setIsAudioSetup(true);
                        setupInProgressRef.current = false;
                    } catch (error) {
                        if (isActive) {
                            console.error(error);
                            cleanupAudio();
                            setIsAudioSetup(false);
                        }
                        setupInProgressRef.current = false;
                    }
                }
            }["useMediaCapture.useEffect.setupAudioProcessing"];
            console.log("[Camera] Starting audio processing setup");
            setupAudioProcessing();
            return ({
                "useMediaCapture.useEffect": ()=>{
                    isActive = false;
                    setIsAudioSetup(false);
                    setupInProgressRef.current = false;
                    if (audioWorkletNodeRef.current) {
                        audioWorkletNodeRef.current.disconnect();
                        audioWorkletNodeRef.current = null;
                    }
                }
            })["useMediaCapture.useEffect"];
        }
    }["useMediaCapture.useEffect"], [
        isStreaming,
        stream,
        isWebSocketReady,
        isModelSpeaking,
        cleanupAudio,
        isAudioSetup
    ]);
    return {
        videoRef,
        videoCanvasRef,
        isStreaming,
        isAudioOnly,
        connectionStatus,
        audioLevel,
        isModelSpeaking,
        outputAudioLevel,
        toggleCamera,
        toggleAudio
    };
};
_s(useMediaCapture, "mrOIa8DnzAYjc24O9jt7F4tHn9Q=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/components/CameraPreview.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$hooks$2f$useMediaCapture$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/app/hooks/useMediaCapture.ts [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
"use client";
;
;
const CameraPreview = /*#__PURE__*/ _s((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c = _s(({ onTranscription }, ref)=>{
    _s();
    const { videoRef, videoCanvasRef, isStreaming, isAudioOnly, connectionStatus, audioLevel, isModelSpeaking, outputAudioLevel, toggleCamera, toggleAudio } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$hooks$2f$useMediaCapture$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMediaCapture"])(onTranscription);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useImperativeHandle"])(ref, {
        "CameraPreview.useImperativeHandle": ()=>({
                toggleCamera,
                toggleAudio,
                isStreaming,
                isAudioOnly,
                connectionStatus,
                audioLevel,
                isModelSpeaking,
                outputAudioLevel
            })
    }["CameraPreview.useImperativeHandle"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                        ref: videoRef,
                        autoPlay: true,
                        playsInline: true,
                        className: "w-[200px] h-[133px] bg-muted rounded-lg overflow-hidden"
                    }, void 0, false, {
                        fileName: "[project]/app/components/CameraPreview.tsx",
                        lineNumber: 50,
                        columnNumber: 11
                    }, this),
                    isStreaming && connectionStatus !== 'connected' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg backdrop-blur-sm",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center space-y-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/CameraPreview.tsx",
                                    lineNumber: 61,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-white font-medium",
                                    children: connectionStatus === 'connecting' ? 'Connecting to Gemini...' : 'Disconnected'
                                }, void 0, false, {
                                    fileName: "[project]/app/components/CameraPreview.tsx",
                                    lineNumber: 62,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-white/70 text-sm",
                                    children: "Please wait while we establish a secure connection"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/CameraPreview.tsx",
                                    lineNumber: 65,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/CameraPreview.tsx",
                            lineNumber: 60,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/CameraPreview.tsx",
                        lineNumber: 59,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/CameraPreview.tsx",
                lineNumber: 49,
                columnNumber: 9
            }, this),
            isStreaming && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-[200px] h-2 rounded-full bg-green-100",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-full rounded-full transition-all bg-green-500",
                    style: {
                        width: `${isModelSpeaking ? outputAudioLevel : audioLevel}%`,
                        transition: 'width 100ms ease-out'
                    }
                }, void 0, false, {
                    fileName: "[project]/app/components/CameraPreview.tsx",
                    lineNumber: 74,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/CameraPreview.tsx",
                lineNumber: 73,
                columnNumber: 11
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                ref: videoCanvasRef,
                className: "hidden"
            }, void 0, false, {
                fileName: "[project]/app/components/CameraPreview.tsx",
                lineNumber: 83,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/CameraPreview.tsx",
        lineNumber: 48,
        columnNumber: 7
    }, this);
}, "Gvizc/cnR6pRoDWkxxJuC0Z9VGQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$hooks$2f$useMediaCapture$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMediaCapture"]
    ];
})), "Gvizc/cnR6pRoDWkxxJuC0Z9VGQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$hooks$2f$useMediaCapture$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMediaCapture"]
    ];
});
_c1 = CameraPreview;
CameraPreview.displayName = 'CameraPreview';
const __TURBOPACK__default__export__ = CameraPreview;
var _c, _c1;
__turbopack_refresh__.register(_c, "CameraPreview$forwardRef");
__turbopack_refresh__.register(_c1, "CameraPreview");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/lib/utils.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "cn": (()=>cn)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/ui/scroll-area.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "ScrollArea": (()=>ScrollArea),
    "ScrollBar": (()=>ScrollBar)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@radix-ui/react-scroll-area/dist/index.mjs [app-client] (ecmascript)");
"use client";
;
;
;
;
const ScrollArea = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.forwardRef(_c = ({ className, children, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__.Root, {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative overflow-hidden", className),
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__.Viewport, {
                className: "h-full w-full rounded-[inherit]",
                children: children
            }, void 0, false, {
                fileName: "[project]/components/ui/scroll-area.tsx",
                lineNumber: 17,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ScrollBar, {}, void 0, false, {
                fileName: "[project]/components/ui/scroll-area.tsx",
                lineNumber: 20,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__.Corner, {}, void 0, false, {
                fileName: "[project]/components/ui/scroll-area.tsx",
                lineNumber: 21,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/scroll-area.tsx",
        lineNumber: 12,
        columnNumber: 3
    }, this));
_c1 = ScrollArea;
ScrollArea.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__.Root.displayName;
const ScrollBar = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.forwardRef(({ className, orientation = "vertical", ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__.ScrollAreaScrollbar, {
        ref: ref,
        orientation: orientation,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex touch-none select-none transition-colors", orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]", orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]", className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__.ScrollAreaThumb, {
            className: "relative flex-1 rounded-full bg-border"
        }, void 0, false, {
            fileName: "[project]/components/ui/scroll-area.tsx",
            lineNumber: 43,
            columnNumber: 5
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ui/scroll-area.tsx",
        lineNumber: 30,
        columnNumber: 3
    }, this));
_c2 = ScrollBar;
ScrollBar.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__.ScrollAreaScrollbar.displayName;
;
var _c, _c1, _c2;
__turbopack_refresh__.register(_c, "ScrollArea$React.forwardRef");
__turbopack_refresh__.register(_c1, "ScrollArea");
__turbopack_refresh__.register(_c2, "ScrollBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/ui/avatar.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "Avatar": (()=>Avatar),
    "AvatarFallback": (()=>AvatarFallback),
    "AvatarImage": (()=>AvatarImage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$avatar$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@radix-ui/react-avatar/dist/index.mjs [app-client] (ecmascript)");
"use client";
;
;
;
;
const Avatar = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.forwardRef(_c = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$avatar$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__.Root, {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/avatar.tsx",
        lineNumber: 12,
        columnNumber: 3
    }, this));
_c1 = Avatar;
Avatar.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$avatar$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__.Root.displayName;
const AvatarImage = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.forwardRef(_c2 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$avatar$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__.Image, {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("aspect-square h-full w-full", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/avatar.tsx",
        lineNumber: 27,
        columnNumber: 3
    }, this));
_c3 = AvatarImage;
AvatarImage.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$avatar$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__.Image.displayName;
const AvatarFallback = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.forwardRef(_c4 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$avatar$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__.Fallback, {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex h-full w-full items-center justify-center rounded-full bg-muted", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/avatar.tsx",
        lineNumber: 39,
        columnNumber: 3
    }, this));
_c5 = AvatarFallback;
AvatarFallback.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$avatar$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__.Fallback.displayName;
;
var _c, _c1, _c2, _c3, _c4, _c5;
__turbopack_refresh__.register(_c, "Avatar$React.forwardRef");
__turbopack_refresh__.register(_c1, "Avatar");
__turbopack_refresh__.register(_c2, "AvatarImage$React.forwardRef");
__turbopack_refresh__.register(_c3, "AvatarImage");
__turbopack_refresh__.register(_c4, "AvatarFallback$React.forwardRef");
__turbopack_refresh__.register(_c5, "AvatarFallback");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
// app/page.tsx
__turbopack_esm__({
    "default": (()=>Home)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$CameraPreview$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/app/components/CameraPreview.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$scroll$2d$area$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/components/ui/scroll-area.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/components/ui/avatar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/mic.js [app-client] (ecmascript) <export default as Mic>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/camera.js [app-client] (ecmascript) <export default as Camera>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUp$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/arrow-up.js [app-client] (ecmascript) <export default as ArrowUp>");
;
var _s = __turbopack_refresh__.signature();
"use client";
;
;
;
;
;
// Helper function to create message components
const HumanMessage = ({ text })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex gap-3 items-start",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Avatar"], {
                className: "h-8 w-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AvatarImage"], {
                        src: "/avatars/human.png",
                        alt: "Human"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 14,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AvatarFallback"], {
                        children: "H"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 15,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 13,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 space-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm font-medium text-zinc-900",
                            children: "You"
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 19,
                            columnNumber: 9
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 18,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-lg bg-zinc-100 px-3 py-2 text-sm text-zinc-800",
                        children: text
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 21,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 17,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 12,
        columnNumber: 3
    }, this);
_c = HumanMessage;
const GeminiMessage = ({ text })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex gap-3 items-start",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Avatar"], {
                className: "h-8 w-8 bg-blue-600",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AvatarImage"], {
                        src: "/avatars/gemini.png",
                        alt: "Gemini"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 31,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AvatarFallback"], {
                        children: "AI"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 32,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 30,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 space-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm font-medium text-zinc-900",
                            children: "Gemini"
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 36,
                            columnNumber: 9
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 35,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-lg bg-white px-3 py-2 text-sm text-zinc-800",
                        children: text
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 38,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 34,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 29,
        columnNumber: 3
    }, this);
_c1 = GeminiMessage;
function Home() {
    _s();
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isAudioActive, setIsAudioActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isCameraActive, setIsCameraActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const cameraRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const handleTranscription = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Home.useCallback[handleTranscription]": (transcription)=>{
            setMessages({
                "Home.useCallback[handleTranscription]": (prev)=>[
                        ...prev,
                        {
                            type: 'gemini',
                            text: transcription
                        }
                    ]
            }["Home.useCallback[handleTranscription]"]);
        }
    }["Home.useCallback[handleTranscription]"], []);
    const handleToggleCamera = ()=>{
        if (cameraRef.current) {
            cameraRef.current.toggleCamera();
            if (!isCameraActive && !isAudioActive) {
                // If turning on camera from completely off state
                setIsAudioActive(true);
                setIsCameraActive(true);
            } else {
                setIsCameraActive(!isCameraActive);
                if (isCameraActive) {
                    // If turning off camera, also turn off audio
                    setIsAudioActive(false);
                }
            }
        }
    };
    const handleToggleAudio = ()=>{
        if (cameraRef.current) {
            cameraRef.current.toggleAudio();
            setIsAudioActive(!isAudioActive);
            if (isCameraActive && isAudioActive) {
                // If turning off audio while camera is on, also turn off camera
                setIsCameraActive(false);
            }
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-screen w-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: "w-1/5 bg-zinc-100 p-6 border-r border-zinc-300",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-2xl font-bold text-zinc-800 mb-4",
                    children: "Health Innovators AI Chatbot"
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 88,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 87,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "flex-1 flex flex-col ",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 p-2 overflow-hidden ",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mx-auto max-w-full bg-white rounded-lg flex flex-col h-full w-full justify-center items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-2xl font-bold text-zinc-800 mb-6 m-6",
                                children: "Health Innovators AI Chatbot"
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 100,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$scroll$2d$area$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollArea"], {
                                className: "flex-1 p-6 w-10/12",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GeminiMessage, {
                                                text: "Hi! I'm Gemini. I can see and hear you. Let's chat!"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 108,
                                                columnNumber: 15
                                            }, this),
                                            messages.map((message, index)=>message.type === 'human' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HumanMessage, {
                                                    text: message.text
                                                }, `msg-${index}`, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 111,
                                                    columnNumber: 19
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GeminiMessage, {
                                                    text: message.text
                                                }, `msg-${index}`, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 113,
                                                    columnNumber: 19
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 107,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute bottom-4 right-4 z-10",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$CameraPreview$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            ref: cameraRef,
                                            onTranscription: handleTranscription
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 119,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 118,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 105,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4 bg-zinc-100 rounded-xl mb-9 w-10/12",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col items-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            placeholder: "Type your message...",
                                            className: "w-full p-3 rounded-xl bg-zinc-100 focus:outline-none focus:ring-0"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 128,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex w-full",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: `px-3 text-2xl font-bold rounded-full transition-colors ${isAudioActive ? 'text-black' : 'text-zinc-400 hover:text-black'}`,
                                                    onClick: handleToggleAudio,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__["Mic"], {
                                                        size: 20
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 142,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 136,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: `px-3 text-2xl font-bold rounded-full transition-colors ${isCameraActive ? 'text-black' : 'text-zinc-400 hover:text-black'}`,
                                                    onClick: handleToggleCamera,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__["Camera"], {
                                                        size: 20
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 151,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 145,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "ml-auto p-2 text-2xl font-bold border border-zinc-400 text-zinc-400 rounded-full hover:text-black hover:border-black",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUp$3e$__["ArrowUp"], {
                                                        size: 32
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 159,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 158,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 134,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 126,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 125,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 98,
                        columnNumber: 9
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 97,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 95,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 85,
        columnNumber: 5
    }, this);
}
_s(Home, "aKe8gNZeOe8yjrKNNEWoL1UpCjw=");
_c2 = Home;
var _c, _c1, _c2;
__turbopack_refresh__.register(_c, "HumanMessage");
__turbopack_refresh__.register(_c1, "GeminiMessage");
__turbopack_refresh__.register(_c2, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
}]);

//# sourceMappingURL=_a24de8._.js.map