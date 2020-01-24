import { Volume } from 'memfs';

export class FS {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  private vol: any = null;

  constructor(files: Record<string, string> = {}) {
    this.vol = Volume.fromJSON(files);
  }

  importFromJSON(files: Record<string, string>): void {
    this.vol.fromJSON(files);
  }

  exportToJSON(): Record<string, string> {
    return this.vol.toJSON();
  }

  async readFile(filePath: string): Promise<string> {
    return await this.vol.readFileSync(filePath).toString('utf-8');
  }
}
