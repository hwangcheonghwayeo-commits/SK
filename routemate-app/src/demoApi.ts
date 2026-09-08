import {initialPlaces, initialCourseOptions} from './data/initialData';
import type {Place} from './types';

// Local portfolio preview only. No AI calls, payments or reservations are sent.
export async function demoFetch(url: string, options?: RequestInit): Promise<Response> {
  const body = JSON.parse(String(options?.body || '{}'));
  let result: object;
  const position = (places: Place[]) => places.map((place, i) => ({...place, mapPos: {x: 60 + (i % 4) * 70, y: 70 + (i % 2) * 45}}));
  const route = (places: Place[]) => places.length ? 'M ' + places.map(p => `${p.mapPos?.x} ${p.mapPos?.y}`).join(' L ') : '';
  if (url === '/api/extract-places') {
    result = {success: true, source: 'portfolio-demo', places: initialPlaces};
  } else if (url === '/api/recommend-courses') {
    const places: Place[] = body.places?.length ? body.places : initialPlaces;
    result = {success: true, source: 'portfolio-demo', courses: initialCourseOptions.map((course, i) => {
      const ordered = i === 0 ? places : i === 1 ? [...places].reverse() : [...places.slice(1), places[0]];
      const stops = position(ordered);
      return {...course, stops, svgRoutePath: route(stops), subtitle: `체험용 예시 · ${body.conditions?.durationLabel || '반나절'} · ${body.conditions?.budgetLabel || '5만원 이하'}`};
    })};
  } else if (url === '/api/reoptimize-route') {
    const places: Place[] = [...(body.stops || [])];
    if (body.newPlaceName) places.push({id: `demo-${Date.now()}`, name: body.newPlaceName, category: 'other', categoryLabel: '직접 추가', address: '체험용 장소', tags: ['#체험'], stayMinutes: 30});
    const stops = position(places);
    result = {success: true, stops, svgRoutePath: route(stops), totalDurationStr: `${stops.length}곳 · 체험용 코스`};
  } else {
    return new Response(JSON.stringify({success: false}), {status: 404});
  }
  return new Response(JSON.stringify(result), {headers: {'Content-Type': 'application/json'}});
}
