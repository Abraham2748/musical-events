import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HelloWorldComponent } from './hello-world/hello-world.component';
import { HolaMundo } from './hola-mundo/hola-mundo';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HelloWorldComponent, HolaMundo],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('musical-events');
}
