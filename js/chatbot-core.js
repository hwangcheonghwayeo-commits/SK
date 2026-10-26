(function (root) {
  'use strict';
  const normalize = text => String(text).normalize('NFKC').toLowerCase().replace(/[\s\p{P}\p{S}]/gu, '');
  function match(flow, text) {
    const query = normalize(text);
    if (!query) return [];
    const matches = Object.entries(flow.nodes).map(([id, node]) => ({ id, score: Math.max(0, ...node.keywords.map(keyword => {
      const key = normalize(keyword);
      return key && query.includes(key) ? key.length + (query === key ? 1000 : 0) : 0;
    })) })).filter(item => item.score > 0).sort((a, b) => b.score - a.score);
    if (!matches.length) return [];
    return matches.filter(item => item.score === matches[0].score).map(item => item.id);
  }
  function restore(flow, raw) {
    try {
      const value = JSON.parse(raw);
      const known = id => typeof id === 'string' && Object.hasOwn(flow.nodes, id);
      if (!value || value.version !== flow.version || !known(value.current) || !Array.isArray(value.trail) || !Array.isArray(value.messages)) return null;
      const trail = value.trail.filter(known).slice(-40);
      if (!trail.length || trail[trail.length - 1] !== value.current) return null;
      // Persist only registered content identifiers, never raw text or form values.
      const messages = value.messages.filter(item => item && ['bot', 'user'].includes(item.role) && known(item.id)).slice(-60).map(item => ({ role: item.role, id: item.id }));
      const pendingChoices = Array.isArray(value.pendingChoices) ? value.pendingChoices.filter(known).slice(0, 8) : [];
      return { version: flow.version, current: value.current, trail, messages, pendingChoices, open: value.open === true };
    } catch { return null; }
  }
  const api = { normalize, match, restore };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.RaonChatCore = api;
})(typeof window !== 'undefined' ? window : globalThis);
