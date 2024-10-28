import * as fs from "fs";
import * as path from "path";
import { FormConfig } from "../types/form.types";


export function generateFormConfig(filePath: string, config: FormConfig): void {
  const fullPath = path.resolve(process.cwd(), filePath);
  const jsonData = JSON.stringify(config, null, 2);

  fs.writeFile(fullPath, jsonData, (err) => {
    if (err) {
      console.error("Error writing JSON file:", err);
    } else {
      console.log(`Form configuration saved at ${fullPath}`);
    }
  });
}
