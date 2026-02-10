import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  isAccepted = signal(false);
  showSecretMessage = signal(false);
  daysTogether = signal(0);
  days = signal(0);
  hours = signal(0);
  minutes = signal(0);
  seconds = signal(0);
  timerInterval: any;

ngOnInit() {
 this.startLiveTimer();
}

ngOnDestroy() {
    if (this.timerInterval) clearInterval(this.timerInterval);
  }
 startLiveTimer() {
    const startDate = new Date('2024-12-25T00:00:00'); // Your anniversary start

    this.timerInterval = setInterval(() => {
      const now = new Date();
      const diff = now.getTime() - startDate.getTime();

      this.days.set(Math.floor(diff / (1000 * 60 * 60 * 24)));
      this.hours.set(Math.floor((diff / (1000 * 60 * 60)) % 24));
      this.minutes.set(Math.floor((diff / 1000 / 60) % 60));
      this.seconds.set(Math.floor((diff / 1000) % 60));
    }, 1000);
  }
  memories = [
    { emoji: '☕', text: 'Our coffee/work dates' },
    { emoji: '🍂', text: 'Bike rides' },
    { emoji: '🏠', text: 'Cozy BNB nights' },
    { emoji: '📖', text: 'Our growing story' }
  ];

  reasons = [
    "Thanks for showing me how beautiful the world can be",
    "Thanks for taking care of me every single second.",
    "The way you make me feel safe.",
    "Thanks for being my PARTNER"
  ];

  onYes() {
    this.isAccepted.set(true);
    this.launchGrandConfetti();
  }

  toggleSecret() {
    this.showSecretMessage.update(val => !val);
  }

launchGrandConfetti() {
  const duration = 10 * 1000; // 10 seconds of celebration
  const animationEnd = Date.now() + duration;
  const colors = ['#6F4E37', '#A67B5B', '#ECB176', '#FED8B1'];

  const frame = () => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) return;

    const particleCount = 2; // Number of particles per frame per side

    // Fire from the left
    confetti({
      particleCount,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.6 },
      colors: colors
    });

    // Fire from the right
    confetti({
      particleCount,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.6 },
      colors: colors
    });

    // Request the next frame to keep it going
    requestAnimationFrame(frame);
  };

  frame();
}
}