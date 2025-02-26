export interface OpenProjectNotification {
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
