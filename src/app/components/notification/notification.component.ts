import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { RightPanelComponent } from '../right-panel/right-panel.component';

interface OpenProjectNotification {
  _links: {
    self: { href: string };
    user: { href: string };
    project: { href: string };
    resource: { href: string };
  };
  id: number;
  reason: string;
  readIANATimeZone: string;
  createdAt: string;
  updatedAt: string;
}

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule, NavbarComponent, RightPanelComponent],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit {
  notifications: OpenProjectNotification[] = [
    {
      _links: {
        self: { href: '/api/v3/notifications/1' },
        user: { href: '/api/v3/users/1' },
        project: { href: '/api/v3/projects/1' },
        resource: { href: '/api/v3/work_packages/1' },
      },
      id: 1,
      reason: 'Profile Picture has been Updated.',
      readIANATimeZone: 'UTC',
      createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
      updatedAt: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      _links: {
        self: { href: '/api/v3/notifications/2' },
        user: { href: '/api/v3/users/2' },
        project: { href: '/api/v3/projects/2' },
        resource: { href: '/api/v3/work_packages/2' },
      },
      id: 2,
      reason: 'You have new message from John".',
      readIANATimeZone: 'UTC',
      createdAt: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
      updatedAt: new Date(Date.now() - 7200000).toISOString(),
    },
    {
      _links: {
        self: { href: '/api/v3/notifications/3' },
        user: { href: '/api/v3/users/3' },
        project: { href: '/api/v3/projects/3' },
        resource: { href: '/api/v3/work_packages/3' },
      },
      id: 3,
      reason: 'Priya liked your post.',
      readIANATimeZone: 'UTC',
      createdAt: new Date(Date.now() - 10800000).toISOString(), // 3 hours ago
      updatedAt: new Date(Date.now() - 10800000).toISOString(),
    },
    {
      _links: {
        self: { href: '/api/v3/notifications/4' },
        user: { href: '/api/v3/users/4' },
        project: { href: '/api/v3/projects/4' },
        resource: { href: '/api/v3/work_packages/4' },
      },
      id: 4,
      reason: 'Bob has commented on you Post',
      readIANATimeZone: 'UTC',
      createdAt: new Date(Date.now() - 14400000).toISOString(), // 4 hours ago
      updatedAt: new Date(Date.now() - 14400000).toISOString(),
    },
    {
      _links: {
        self: { href: '/api/v3/notifications/5' },
        user: { href: '/api/v3/users/5' },
        project: { href: '/api/v3/projects/5' },
        resource: { href: '/api/v3/work_packages/5' },
      },
      id: 5,
      reason: 'Sylvia, Who you might know is on Buzzly.',
      readIANATimeZone: 'UTC',
      createdAt: new Date(Date.now() - 18000000).toISOString(), // 5 hours ago
      updatedAt: new Date(Date.now() - 18000000).toISOString(),
    },
    {
      _links: {
        self: { href: '/api/v3/notifications/6' },
        user: { href: '/api/v3/users/6' },
        project: { href: '/api/v3/projects/6' },
        resource: { href: '/api/v3/work_packages/6' },
      },
      id: 6,
      reason: 'You have a follow request from Tracey',
      readIANATimeZone: 'UTC',
      createdAt: new Date(Date.now() - 21600000).toISOString(), // 6 hours ago
      updatedAt: new Date(Date.now() - 21600000).toISOString(),
    },
    {
      _links: {
        self: { href: '/api/v3/notifications/7' },
        user: { href: '/api/v3/users/7' },
        project: { href: '/api/v3/projects/7' },
        resource: { href: '/api/v3/work_packages/7' },
      },
      id: 7,
      reason: 'Wilson has invited you to follow cookingWithWilson page.',
      readIANATimeZone: 'UTC',
      createdAt: new Date(Date.now() - 25200000).toISOString(), // 7 hours ago
      updatedAt: new Date(Date.now() - 25200000).toISOString(),
    },
    {
      _links: {
        self: { href: '/api/v3/notifications/8' },
        user: { href: '/api/v3/users/8' },
        project: { href: '/api/v3/projects/8' },
        resource: { href: '/api/v3/work_packages/8' },
      },
      id: 8,
      reason:
        'You have been invited by Sylvia to the event happening near you.',
      readIANATimeZone: 'UTC',
      createdAt: new Date(Date.now() - 28800000).toISOString(), // 8 hours ago
      updatedAt: new Date(Date.now() - 28800000).toISOString(),
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  markAsRead(id: number): void {
    console.log(`Marking notification ${id} as read.`);
  }

  clearNotifications(): void {
    console.log('Clearing notifications.');
  }
}
