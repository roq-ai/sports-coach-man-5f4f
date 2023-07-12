const mapping: Record<string, string> = {
  clubs: 'club',
  'training-groups': 'training_group',
  users: 'user',
  venues: 'venue',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
