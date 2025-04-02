export interface CameraPreviewHandles {
  toggleCamera: () => Promise<void> | void;
  toggleAudio: () => Promise<void> | void;
  isStreaming: boolean;
  isAudioOnly: boolean;
  connectionStatus: string;
  audioLevel: number;
  isModelSpeaking: boolean;
  outputAudioLevel: number;
} 