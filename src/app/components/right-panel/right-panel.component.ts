import { Component, EventEmitter, Output } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service'; // Import UserService

@Component({
  selector: 'app-right-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.css'],
})
export class RightPanelComponent {
  newsHeadlines: { title: string; category: string; link: string }[] = [];
  suggestedUsers: any = ([] = []);

  @Output() panelToggled = new EventEmitter<boolean>();

  constructor(
    private newsService: NewsService,
    private userService: UserService
  ) {} // Inject UserService

  ngOnInit() {
    this.fetchNews();
    this.fetchSuggestedUsers();
  }

  fetchNews() {
    this.newsService.getTrendingNews().subscribe((response) => {
      this.newsHeadlines = response.results.slice(0, 5).map((news: any) => ({
        title: this.shortenHeadline(news.title),
        category: news.category?.[0] || 'general',
        link: news.link,
      }));
    });
  }

  fetchSuggestedUsers() {
    this.userService.fetchUsers(); // Simply call fetchUsers
    this.userService.users$.subscribe((users) => {
      this.suggestedUsers = users;
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
      general: '📢',
    };
    return icons[category] || '📢';
  }

  followUser(user: any) {
    user.isFollowing = !user.isFollowing;
  }
}
