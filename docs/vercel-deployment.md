# Vercel 배포

환경변수 이름은 **BUSAN_TOURISM_API_KEY**입니다. `VITE_`, `NEXT_PUBLIC_`, `PUBLIC_` 같은 공개 접두사를 붙이지 마세요. 로컬 `.env`를 업로드하지 않습니다.

## Vercel 설정

1. GitHub 저장소 `hwangcheonghwayeo-commits/SK`를 Import합니다.
2. Root Directory는 저장소 루트, Framework Preset은 **Other**입니다.
3. Node.js 22.x, Build Command `npm run build`, Output Directory `public`입니다. `package.json`과 `vercel.json`에 포함되어 있습니다.
4. Settings → Environment Variables에 `BUSAN_TOURISM_API_KEY`를 추가합니다. Value에는 서비스 키만 넣습니다. 따옴표나 전체 요청 URL은 넣지 마세요. 인코딩/디코딩 키 모두 처리합니다. 필요한 Production/Preview 환경을 선택하고 가능한 경우 Sensitive로 설정합니다.
5. 배포합니다. 환경변수를 나중에 바꾸면 해당 환경에 Redeploy해야 합니다. 프리뷰 배포에 비밀키를 허용할지 범위는 직접 선택합니다.

키를 이 채팅이나 프런트엔드 JS에 넣을 필요가 없습니다. `.env.example`은 이름만 있는 빈 예시입니다. 로컬 수집은 기존 `.env`를 그대로 사용할 수 있습니다.

## 동작

- `api/busan-tourism.mjs`는 Vercel Node 서버에서 환경변수를 읽고 공식 API를 호출합니다. 브라우저는 같은 출처의 `/api/busan-tourism`만 요청합니다.
- 공용 `lib/busan-tourism.mjs`에서 필드를 정규화하고 키 포함 여부를 검사합니다. 오류 응답이나 요청 URL을 클라이언트와 로그에 출력하지 않습니다.
- 정상 응답은 Vercel CDN에 1시간 캐시하고 최대 24시간 stale-while-revalidate를 허용합니다. 수집일을 표시하므로 실시간 정보로 안내하지 않습니다.
- 따뜻한 함수 인스턴스에서는 15분 메모리 캐시와 동시 요청 합치기를 사용합니다. 인스턴스 간 공유 캐시는 CDN이며, 전역 영구 메모리 캐시를 가정하지 않습니다.
- 개별 원본 요청은 최대 8초, 전체 수집은 최대 24초로 제한합니다. Vercel 함수 최대 실행시간은 30초입니다. 요청 조건을 입력받지 않아 임의 외부 주소 프록시로 쓸 수 없습니다.
- 키 누락/권한 오류/시간 초과 시 API는 비밀정보가 없는 503을 응답합니다. 페이지는 기존 공개 JSON을 사용하고 저장 데이터임을 표시합니다. 실패 응답은 캐시하지 않습니다.
- 목록 근처로 스크롤할 때 데이터를 불러와 첫 화면의 전송량을 줄입니다. Vercel에서는 초기 HTML에 약 600KB의 중복 데이터 JS를 미리 싣지 않습니다.

## 공개 파일 제한

빌드는 루트 HTML, assets, css, 클라이언트 js, routemate-demo의 허용 파일만 `public`에 복사합니다. `.env`, scripts, lib, api 소스, 개발용 React 소스, 문서, 테스트, 임시 파일은 정적 배포 폴더에 복사하지 않습니다. 서버 함수는 Vercel이 별도 번들링합니다.

기존 출력 폴더 삭제는 이 빌드가 만든 표식과 실제 절대 경로를 검사한 경우에만 수행합니다. 임의의 기존 public 폴더는 삭제하지 않고 실패합니다. 실제 설정된 키가 복사된 공개 파일에 들어 있으면 빌드를 차단합니다. 빌드 중 공식 관광 API를 호출하지 않으므로 API 장애가 정적 배포를 막지 않습니다.

## 기존 호스팅과의 공존

소스 report.html에는 Vercel API 설정을 넣지 않습니다. Vercel 빌드 결과에만 설정을 삽입합니다. GitHub Pages는 저장된 공개 JSON을 읽고, `file://` 로컬 열기는 동일 데이터 JS를 지연 로딩합니다. GitHub Pages 자동 배포 설정은 변경하지 않습니다.

갱신과 검색 동작은 기존과 같습니다. Vercel 실제 배포 후에는 서버 환경변수가 있는 정상 API 응답, 키 없는 환경의 저장 데이터 전환, `.env` 미공개를 확인해야 합니다. 이 변경 자체가 Vercel 프로젝트 생성이나 실배포 완료를 의미하지 않습니다.
