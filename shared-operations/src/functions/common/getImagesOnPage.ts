
import { PDFPageProxy } from "pdfjs-dist/types/src/display/api";

import * as PDFJS from "pdfjs-dist";

export interface PDFJSImage {
    width: number;
    height: number;
    interpolate?: any;
    kind: number; // TODO: Document what this is, maybe hasAlpha?
    data: Uint8ClampedArray;
}

export async function getImagesOnPage(page: PDFPageProxy): Promise<PDFJSImage[]> {
    const ops = await page.getOperatorList();
    const images: PDFJSImage[] = [];
    for (let j=0; j < ops.fnArray.length; j++) {
        if (ops.fnArray[j] == PDFJS.OPS.paintImageXObject) {
            const image = page.objs.get(ops.argsArray[j][0]) as PDFJSImage;
            images.push(image);
        }
    }
    return images;
}