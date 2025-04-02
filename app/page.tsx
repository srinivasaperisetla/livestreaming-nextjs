// app/page.tsx
"use client";
import { useState, useCallback, useRef } from 'react';
import CameraPreview from './components/CameraPreview';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Mic, Camera, ArrowUp } from "lucide-react";
import { CameraPreviewHandles } from './types/camera';

// Helper function to create message components
const HumanMessage = ({ text }: { text: string }) => (
  <div className="flex gap-3 items-start">
    <Avatar className="h-8 w-8">
      <AvatarImage src="/avatars/human.png" alt="Human" />
      <AvatarFallback>H</AvatarFallback>
    </Avatar>
    <div className="flex-1 space-y-2">
      <div className="flex items-center gap-2">
        <p className="text-sm font-medium text-zinc-900">You</p>
      </div>
      <div className="rounded-lg bg-zinc-100 px-3 py-2 text-sm text-zinc-800">
        {text}
      </div>
    </div>
  </div>
);

const GeminiMessage = ({ text }: { text: string }) => (
  <div className="flex gap-3 items-start">
    <Avatar className="h-8 w-8 bg-blue-600">
      <AvatarImage src="/avatars/gemini.png" alt="Gemini" />
      <AvatarFallback>AI</AvatarFallback>
    </Avatar>
    <div className="flex-1 space-y-2">
      <div className="flex items-center gap-2">
        <p className="text-sm font-medium text-zinc-900">Gemini</p>
      </div>
      <div className="rounded-lg bg-white px-3 py-2 text-sm text-zinc-800">
        {text}
      </div>
    </div>
  </div>
);

export default function Home() {
  
  const [messages, setMessages] = useState<{ type: 'human' | 'gemini', text: string }[]>([]);
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const cameraRef = useRef<CameraPreviewHandles>(null);

  const handleTranscription = useCallback((transcription: string) => {
    setMessages(prev => [...prev, { type: 'gemini', text: transcription }]);
  }, []);

  const handleToggleCamera = () => {
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

  const handleToggleAudio = () => {
    if (cameraRef.current) {
      cameraRef.current.toggleAudio();
      setIsAudioActive(!isAudioActive);
      if (isCameraActive && isAudioActive) {
        // If turning off audio while camera is on, also turn off camera
        setIsCameraActive(false);
      }
    }
  };

  return (
    <div className="flex h-screen w-full">
    {/* Sidebar */}
    <aside className="w-1/5 bg-zinc-100 p-6 border-r border-zinc-300">
      <h2 className="text-2xl font-bold text-zinc-800 mb-4">
        Health Innovators AI Chatbot
      </h2>
      {/* You can add additional sidebar items or navigation here */}
    </aside>

    {/* Main Chat Area */}
    <main className="flex-1 flex flex-col ">
      {/* Chat Window */}
      <div className="flex-1 p-2 overflow-hidden ">
        <div className="mx-auto max-w-full bg-white rounded-lg flex flex-col h-full w-full justify-center items-center">

          <h2 className="text-2xl font-bold text-zinc-800 mb-6 m-6">
            Health Innovators AI Chatbot
          </h2>

          
          <ScrollArea className="flex-1 p-6 w-10/12">

            <div className="space-y-4">
              <GeminiMessage text="Hi! I'm Gemini. I can see and hear you. Let's chat!" />
              {messages.map((message, index) =>
                message.type === 'human' ? (
                  <HumanMessage key={`msg-${index}`} text={message.text} />
                ) : (
                  <GeminiMessage key={`msg-${index}`} text={message.text} />
                )
              )}
            </div>

            <div className='absolute bottom-4 right-4 z-10'> 
              <CameraPreview ref={cameraRef} onTranscription={handleTranscription} />
            </div>
            
          </ScrollArea>
          
          {/* Input Area */}
          <div className="p-4 bg-zinc-100 rounded-xl mb-9 w-10/12">
            <div className="flex flex-col items-center">

              <input
                type="text"
                placeholder="Type your message..."
                className="w-full p-3 rounded-xl bg-zinc-100 focus:outline-none focus:ring-0"
              />

              <div className="flex w-full"> 

                <button 
                  className={`px-3 text-2xl font-bold rounded-full transition-colors ${
                    isAudioActive ? 'text-black' : 'text-zinc-400 hover:text-black'
                  }`}
                  onClick={handleToggleAudio}
                >
                  <Mic size={20} />
                </button>

                <button 
                  className={`px-3 text-2xl font-bold rounded-full transition-colors ${
                    isCameraActive ? 'text-black' : 'text-zinc-400 hover:text-black'
                  }`}
                  onClick={handleToggleCamera}
                >
                  <Camera size={20} />
                </button>

                {/* <button className="px-3 text-2xl font-bold text-zinc-400 rounded-full hover:text-green">
                  <Monitor size={20} />
                </button> */}
                
                <button className="ml-auto p-2 text-2xl font-bold border border-zinc-400 text-zinc-400 rounded-full hover:text-black hover:border-black">
                  <ArrowUp size={32} />
                </button>

              </div>
              
            </div>
          </div>

        </div>
      </div>

    </main>
  </div>
  );
}
