import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // Input donde escribiremos el texto a copiar
  textControl: FormControl;

  // TextArea donde podemos escribir un texto largo
  textAreaControl: FormControl;

  constructor(
    private clipboard: Clipboard,  // Servicio para usar el portapapeles
    private snackBar: MatSnackBar  // Servicio para usar snackbars
  ) {
    // Se inicializa el input como FormControl
    this.textControl = new FormControl();

    // Se inicializa el textarea como FormControl
    this.textAreaControl = new FormControl();
  }

  /**
   * Copia el texto del input en el portapapeles y muestra un snackbar
   */
  copyToClipboard(): void {
    // Se copia el texto del input al portapapeles
    this.clipboard.copy(this.textControl.value);

    // Se muestra un snackbar durante 2 segundos en la parte inferior
    this.snackBar.open('¡Texto copiado al portapapeles!', null, {
      duration: 2000,
      panelClass: 'snackbar'
    });
  }

  /**
   * Copia el texto del textarea en el portapapeles y muestra un snackbar
   */
  longCopyToClipboard(): void {
    // Se inicia un intento de copia
    const pendingCopy = this.clipboard.beginCopy(this.textAreaControl.value);

    // Intentos de copia que se harán para el texto
    let copyAttempts = 3;

    // Función que realizará los intentos de copia del texto
    const attempt = () => {
      // Variable que indica si la copia del texto se ejecutó correctamente
      const result = pendingCopy.copy();

      // Si no se ejecutó correctamente se vuelve a intentar
      if (!result && --copyAttempts) {
        attempt();
      }
      else {
        // Se muestra un snackbar durante 2 segundos en la parte inferior
        this.snackBar.open('¡Texto largo copiado al portapapeles!', null, {
          duration: 2000,
          panelClass: 'snackbar'
        });

        // Limpia el intento de copia
        pendingCopy.destroy();
      }
    };

    // Se ejecuta la función de copiado
    attempt();
  }
}
