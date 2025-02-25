import { Component, EventEmitter, Output } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-right-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.scss']
})
export class RightPanelComponent {
  newsHeadlines: { title: string; category: string; link: string }[] = [];
  isCollapsed = false; // State for collapse

  @Output() panelToggled = new EventEmitter<boolean>();

  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.fetchNews();
  }

  fetchNews() {
    this.newsService.getTrendingNews().subscribe(response => {
      this.newsHeadlines = response.results.slice(0, 5).map((news: any) => ({
        title: this.shortenHeadline(news.title),
        category: news.category?.[0] || 'general',
        link: news.link
      }));
    });
  }

  shortenHeadline(title: string): string {
    return title.split(' ').slice(0, 8).join(' ') + '...';
  }

  getCategoryIcon(category: string): string {
    const icons: { [key: string]: string } = {
      entertainment: '🎭',
      lifestyle: '💅',
      sports: '⚽',
      top: '🔥',
      world: '🌍',
      general: '📢'
    };
    return icons[category] || '📢';
  }

  togglePanel() {
    this.isCollapsed = !this.isCollapsed;
    this.panelToggled.emit(this.isCollapsed); // Notify parent
  }
}
