import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InformeService {

  options = {
    "method": "POST",
    "url": "https://api.pdfendpoint.com/v1/convert",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": "Bearer pdfe_live_9e7a1b0a5f7f22f4b3c51d0cee696a5cb7c9"
    },
    "data": JSON.stringify({
      "sandbox": false,
      "orientation": "vertical",
      "page_size": "A4",
      "margin_top": "2cm",
      "margin_bottom": "2cm",
      "margin_left": "2cm",
      "margin_right": "2cm",
      "html": "<h1>Prueba de gheneracion</h1>"
    })
  };

  testTiempoReaccionData: Object[]= []

  constructor(private httpClient: HttpClient) { }


  
  /**
   * Generates a PDF using the provided options.
   * @returns An observable that emits the generated PDF as a Blob.
   */
  generatePDF() {
    return this.httpClient.post(this.options.url, this.options.data, {
      headers: this.options.headers,
      responseType: 'blob'
    });
  }

  /**
   * Sets the test data for the reaction time test.
   * @param data The data to set.
   */

  setTestTiempoReaccionData(data: Object[]) {
    this.testTiempoReaccionData = data;
  }
}
