export class Snippet {
    id: number;
    language: string;
    description: string;
    snippetText: string;
    keyword: string;
  
  
    constructor() {
      this.id = 0;
      this.language = '';
      this.description = '';
      this.snippetText = '';
      this.keyword = '';
    }
}