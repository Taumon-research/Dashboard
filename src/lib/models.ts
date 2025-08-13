// Types from existing components, adapted for server-side use

export interface UploadedFile {
  filePath: string; // Storing file path instead of the File object
  description: string;
}

export interface OBJ {
  id: string;
  uploadedFiles: UploadedFile[];
  description: string;
}

export interface Shot {
  id: string;
  description: string;
  referencedContent: string;
  transitionPrompt: string;
}

export interface TextShot {
  id: string;
  content: string;
  referencedAssets: string[];
}

export interface VideoBlock {
  id: string;
  textInput: string;
  parameters: {
    quality: string;
    duration: string;
    style: string;
    mood: string;
  };
  selectedTools: string[];
}

export interface WorkflowData {
  metaPrompt: {
    generalPrompt: string;
    objs: OBJ[];
  };
  textShots: TextShot[];
  shots: Shot[];
  generatedContent: VideoBlock[];
}

export interface Project extends WorkflowData {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  projectId: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

export interface TimelineEvent {
  id: string;
  projectId: string;
  title: string;
  description: string;
  timestamp: string;
}
