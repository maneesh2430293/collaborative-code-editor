import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { AiService } from '../services/ai-service';

import { EditorView, basicSetup } from 'codemirror';
import { javascript } from '@codemirror/lang-javascript';
import {
  autocompletion,
  CompletionContext,
  CompletionResult,
} from '@codemirror/autocomplete';
import { yCollab } from 'y-codemirror.next';
import { CollaborationService } from '../services/collaboration-service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-editor',
  imports: [],
  templateUrl: './editor.html',
  styleUrl: './editor.css',
})
export class Editor implements AfterViewInit {
  @ViewChild('editorContainer') editorRef!: ElementRef;

  private editorView!: EditorView;
  constructor(
    private aiService: AiService,
    private collabService: CollaborationService
  ) {}

  ngAfterViewInit(): void {
    this.initEditor();
  }

  private getRandomColor(): string {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return '#' + randomColor.padStart(6, '0');
  }

  private initEditor(): void {
    // Connect to the Collaboration Room
    const provider = this.collabService.connect('my-project-room');
    const ytext = this.collabService.getSharedText();
    const awareness = this.collabService.getAwareness();

    if (!awareness) return;

    let myName = localStorage.getItem('editor-username');

    if (!myName) {
      const input = window.prompt(
        'Enter your name to join the collaboration:',
        'Guest User'
      );
      myName = input || 'Anonymous ' + Math.floor(Math.random() * 100);

      localStorage.setItem('editor-username', myName);
    }
    const myColor = this.getRandomColor();

    this.collabService.setUserIdentity(myName, myColor);

    const aiCompletionSource = async (
      context: CompletionContext
    ): Promise<CompletionResult | null> => {
      // Match the word before cursor. If we are not typing a word, don't trigger AI.
      const word = context.matchBefore(/\w*/);
      if (!word || (word.from == word.to && !context.explicit)) return null;

      // Get the whole document text to send as context
      const currentDoc = context.state.doc.toString();

      try {
        const data = await firstValueFrom(
          this.aiService.getCompletion(currentDoc)
        );

        if (!data || !data.suggestion) {
          console.log('suggestion data');
          // return null;
          return {
            from: context.pos, // Or use word.from if you want to replace the specific word typed
            options: [
              {
                label: 'no suggestion',
                type: 'text',
                detail: ' ✨ Gemini AI',
              },
            ],
          };
        }

        return {
          from: context.pos,
          options: [
            {
              label: data.suggestion,
              type: 'text',
              detail: ' ✨ Gemini AI',
            },
          ],
        };
      } catch (error) {
        console.error('AI Completion Error', error);
        return null;
      }
    };

    this.editorView = new EditorView({
      parent: this.editorRef.nativeElement,
      extensions: [
        basicSetup,
        javascript(),
        yCollab(ytext, awareness),
        autocompletion({ override: [aiCompletionSource] }),
      ],
    });
  }

  ngOnDestroy(): void {
    if (this.editorView) this.editorView.destroy();
    this.collabService.disconnect();
  }
}
