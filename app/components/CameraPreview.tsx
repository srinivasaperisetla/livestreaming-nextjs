"use client";

import { forwardRef, useImperativeHandle } from 'react';
import { useMediaCapture } from '../hooks/useMediaCapture';

interface CameraPreviewProps {
  onTranscription: (text: string) => void;
}

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

const CameraPreview = forwardRef<CameraPreviewHandles, CameraPreviewProps>(
  ({ onTranscription }, ref) => {
    const {
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
    } = useMediaCapture(onTranscription);

    useImperativeHandle(ref, () => ({
      toggleCamera,
      toggleAudio,
      isStreaming,
      isAudioOnly,
      connectionStatus,
      audioLevel,
      isModelSpeaking,
      outputAudioLevel,
    }));

    return (
      <div className="space-y-4">
        <div className="relative">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-[200px] h-[133px] bg-muted rounded-lg overflow-hidden"
          />
          
          {/* Connection Status Overlay */}
          {isStreaming && connectionStatus !== 'connected' && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg backdrop-blur-sm">
              <div className="text-center space-y-2">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto" />
                <p className="text-white font-medium">
                  {connectionStatus === 'connecting' ? 'Connecting to Gemini...' : 'Disconnected'}
                </p>
                <p className="text-white/70 text-sm">
                  Please wait while we establish a secure connection
                </p>
              </div>
            </div>
          )}
        </div>
        {isStreaming && (
          <div className="w-[200px] h-2 rounded-full bg-green-100">
            <div
              className="h-full rounded-full transition-all bg-green-500"
              style={{ 
                width: `${isModelSpeaking ? outputAudioLevel : audioLevel}%`,
                transition: 'width 100ms ease-out'
              }}
            />
          </div>
        )}
        <canvas ref={videoCanvasRef} className="hidden" />
      </div>
    );
  }
);

CameraPreview.displayName = 'CameraPreview';

export default CameraPreview;
