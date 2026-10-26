// Generated from assets/data/*.json. Run node scripts/build-chatbot-data.mjs after editing.
window.RAON_CHATBOT_DATA = {
  "version": 1,
  "name": "라온",
  "start": "home",
  "fallback": "fallback",
  "avatar": "assets/images/common/raon-chat-avatar.svg",
  "nodes": {
    "home": {
      "title": "처음 메뉴",
      "keywords": [
        "안녕",
        "시작",
        "처음",
        "홈",
        "메뉴"
      ],
      "answer": "안녕하세요. 관광 콘텐츠 아카이브를 안내하는 라온입니다. 포트폴리오와 프로젝트 소개, 사이트 이용 방법, 제작·협업 문의를 안내하는 서비스입니다. 궁금한 항목을 선택해 주세요.",
      "buttons": [
        {
          "label": "포트폴리오 둘러보기",
          "next": "portfolio"
        },
        {
          "label": "프로젝트 안내",
          "next": "projects"
        },
        {
          "label": "자주 묻는 질문",
          "next": "faq"
        },
        {
          "label": "제작·협업 문의",
          "next": "inquiry"
        }
      ]
    },
    "portfolio": {
      "title": "포트폴리오 둘러보기",
      "keywords": [
        "포트폴리오",
        "어떤 작업",
        "작업물",
        "둘러보기"
      ],
      "answer": "관광 자원 조사부터 콘텐츠 제작, SNS 운영, 브랜드 기획까지 모은 포트폴리오입니다. 관심 있는 분야를 선택하면 소개와 해당 페이지로 연결되는 메뉴입니다.",
      "buttons": [
        {
          "label": "관광 조사 · REPORT",
          "next": "research"
        },
        {
          "label": "카드뉴스·영상 · CONTENTS",
          "next": "contents"
        },
        {
          "label": "SNS 운영",
          "next": "sns"
        },
        {
          "label": "HARO 브랜드",
          "next": "brand"
        },
        {
          "label": "최종 프로젝트",
          "next": "final"
        }
      ]
    },
    "projects": {
      "title": "프로젝트 안내",
      "keywords": [
        "프로젝트",
        "서비스",
        "결과물"
      ],
      "answer": "여행 서비스 RouteMate, 관광 콘텐츠 제작, HARO 브랜드와 최종 팀 프로젝트를 소개하는 메뉴입니다.",
      "buttons": [
        {
          "label": "RouteMate 여행 서비스",
          "next": "routemate"
        },
        {
          "label": "카드뉴스·영상 제작",
          "next": "contents"
        },
        {
          "label": "HARO 브랜드 기획",
          "next": "brand"
        },
        {
          "label": "최종 팀 프로젝트",
          "next": "final"
        }
      ]
    },
    "research": {
      "title": "관광 자원 조사",
      "keywords": [
        "관광 조사",
        "관광 자원",
        "조사",
        "report",
        "구포시장",
        "f1963",
        "달맞이"
      ],
      "answer": "부산의 관광 자원을 관찰하고 장소별 이야기와 체험 요소를 정리한 REPORT 페이지입니다. F1963, 구포시장 등 장소별 조사 자료와 콘텐츠 기획의 출발점을 살펴볼 수 있는 공간입니다. 운영시간과 요금은 방문 전 공식 안내 확인이 필요한 정보입니다.",
      "buttons": [
        {
          "label": "관광 조사 페이지 보기 ↗",
          "href": "report.html"
        },
        {
          "label": "콘텐츠 제작 보기",
          "next": "contents"
        }
      ]
    },
    "contents": {
      "title": "카드뉴스·영상 콘텐츠",
      "keywords": [
        "카드뉴스",
        "영상",
        "콘텐츠",
        "contents",
        "송도"
      ],
      "answer": "관광 자원을 카드뉴스와 영상으로 소개하는 콘텐츠 아카이브입니다. 송도 해상케이블카 포스터와 이용 가이드가 등록되어 있으며, 일부 콘텐츠 카드는 추가 정리 중입니다. 상세 내용은 CONTENTS 페이지에서 확인할 수 있는 구성입니다.",
      "buttons": [
        {
          "label": "콘텐츠 아카이브 보기 ↗",
          "href": "contents.html"
        },
        {
          "label": "콘텐츠 제작 문의",
          "next": "inquiry_content"
        },
        {
          "label": "SNS 운영 보기",
          "next": "sns"
        }
      ]
    },
    "sns": {
      "title": "SNS 운영 기록",
      "keywords": [
        "sns",
        "인스타",
        "유튜브",
        "조회수",
        "좋아요",
        "공유",
        "국가",
        "통계",
        "대시보드"
      ],
      "answer": "미유_미오 채널의 운영 기록과 수집 시점별 성과를 소개하는 SNS 페이지입니다. 통계는 실시간 값이 아닌 저장된 기록이며, 누적 수치와 기간별 수치를 구분하는 방식입니다. 미확보 값은 0과 다른 상태이며, 국가·지역 분포는 국적을 나타내는 정보가 아닙니다.",
      "buttons": [
        {
          "label": "SNS 대시보드 보기 ↗",
          "href": "sns.html"
        },
        {
          "label": "통계 읽는 방법",
          "next": "data_faq"
        },
        {
          "label": "데이터 오류 문의",
          "next": "inquiry_error"
        }
      ]
    },
    "brand": {
      "title": "HARO 브랜드",
      "keywords": [
        "브랜드",
        "haro",
        "하로",
        "로고",
        "ci",
        "컬러"
      ],
      "answer": "HARO는 여행의 목적지와 커뮤니티를 연결하는 관광 콘텐츠 브랜드입니다. BRAND 페이지는 로고와 대표 색상, 브랜드 아이덴티티 가이드를 소개하는 공간입니다.",
      "buttons": [
        {
          "label": "브랜드 가이드 보기 ↗",
          "href": "brand.html"
        },
        {
          "label": "제작·협업 문의",
          "next": "inquiry"
        }
      ]
    },
    "routemate": {
      "title": "RouteMate 여행 서비스",
      "keywords": [
        "routemate",
        "루트메이트",
        "여행 서비스",
        "여행 코스",
        "여행 플래너"
      ],
      "answer": "RouteMate는 SNS에 저장한 여행지를 여행 코스로 연결하는 서비스 프로젝트입니다. SERVICE 페이지에서 기획 의도와 기능을 살펴볼 수 있는 구성입니다. 이 안내봇은 RouteMate의 AI 기능과 별개이며, 미리 등록된 질문과 답변으로만 작동하는 규칙 기반 챗봇입니다.",
      "buttons": [
        {
          "label": "RouteMate 소개 보기 ↗",
          "href": "service.html"
        },
        {
          "label": "사용 도구 안내",
          "next": "tools"
        },
        {
          "label": "프로젝트 목록",
          "next": "projects"
        }
      ]
    },
    "final": {
      "title": "최종 팀 프로젝트",
      "keywords": [
        "최종",
        "팀 프로젝트",
        "final"
      ],
      "answer": "조사·기획·제작·성과 정리 과정을 소개하는 최종 팀 프로젝트 페이지입니다. 현재 구체적인 프로젝트 제목, 일정, 팀원과 결과물은 정리 중인 항목입니다. 확인되지 않은 성과나 역할은 안내하지 않는 원칙입니다.",
      "buttons": [
        {
          "label": "최종 프로젝트 보기 ↗",
          "href": "final.html"
        },
        {
          "label": "프로젝트 관련 문의",
          "next": "inquiry_other"
        }
      ]
    },
    "faq": {
      "title": "자주 묻는 질문",
      "keywords": [
        "faq",
        "자주 묻는",
        "질문",
        "이용 방법"
      ],
      "answer": "사이트 이용에 필요한 내용을 모은 안내입니다. 아래 질문 중 궁금한 항목을 선택해 주세요.",
      "buttons": [
        {
          "label": "어떤 사이트인가요?",
          "next": "about"
        },
        {
          "label": "어떤 도구로 만들었나요?",
          "next": "tools"
        },
        {
          "label": "자료를 사용해도 되나요?",
          "next": "reuse"
        },
        {
          "label": "통계는 어떻게 읽나요?",
          "next": "data_faq"
        },
        {
          "label": "견적·회신은 언제 받나요?",
          "next": "reply_faq"
        }
      ]
    },
    "about": {
      "title": "사이트 소개",
      "keywords": [
        "사이트 소개",
        "누구",
        "자기소개",
        "어떤 사이트"
      ],
      "answer": "SK플래닛 관광 콘텐츠 제작 과정과 결과물을 정리한 개인 포트폴리오입니다. 관광 자원 조사, 서비스 기획, 콘텐츠 제작, SNS 분석, 브랜드와 팀 프로젝트를 살펴볼 수 있는 공간입니다.",
      "buttons": [
        {
          "label": "홈페이지 보기 ↗",
          "href": "index.html"
        },
        {
          "label": "포트폴리오 둘러보기",
          "next": "portfolio"
        }
      ]
    },
    "tools": {
      "title": "제작 도구",
      "keywords": [
        "도구",
        "기술",
        "스택",
        "어떻게 만들",
        "프로그램"
      ],
      "answer": "이 포트폴리오의 화면은 HTML·CSS·JavaScript로 구성된 정적 웹사이트입니다. RouteMate 소개 페이지에는 React·TypeScript 등 별도의 프로젝트 기술 구성이 안내되어 있는 상태입니다. 현재 라온 챗봇은 생성형 AI 호출 없이 JSON에 등록된 문장과 분기로만 응답하는 방식입니다.",
      "buttons": [
        {
          "label": "RouteMate 기술 구성 보기 ↗",
          "href": "service.html"
        },
        {
          "label": "제작 과정 안내",
          "next": "process"
        }
      ]
    },
    "process": {
      "title": "제작 과정",
      "keywords": [
        "제작 과정",
        "진행 과정",
        "작업 과정"
      ],
      "answer": "사이트에서 소개하는 기본 과정은 관광 자원 조사 → 콘셉트 기획 → 카드뉴스·영상 제작 → 채널 운영과 성과 정리입니다. 프로젝트마다 상세 범위와 역할이 달라 개별 페이지 확인이 필요한 구성입니다.",
      "buttons": [
        {
          "label": "관광 조사 보기",
          "next": "research"
        },
        {
          "label": "프로젝트 안내",
          "next": "projects"
        }
      ]
    },
    "reuse": {
      "title": "자료 이용 안내",
      "keywords": [
        "저작권",
        "사용해도",
        "재사용",
        "다운로드",
        "자료 이용"
      ],
      "answer": "페이지 열람을 위한 공개와 자료의 재배포·상업적 이용 허가는 서로 다른 사항입니다. 현재 별도의 이용 허가 조건이 등록되지 않아 사용 목적을 포함한 사전 문의가 필요한 상태입니다.",
      "buttons": [
        {
          "label": "자료 이용 문의",
          "next": "inquiry_other"
        }
      ]
    },
    "data_faq": {
      "title": "통계 읽는 방법",
      "keywords": [
        "집계 기준",
        "실시간",
        "미확보",
        "통계 읽",
        "업데이트",
        "이번 주",
        "오늘 조회"
      ],
      "answer": "SNS 수치는 페이지에 표시된 수집 기준일과 보고 기간을 함께 확인하는 정보입니다. 최근 7일·28일 수치를 오늘 하루의 조회수로 해석하면 안 되는 구조입니다. 누적 수치의 전주 대비 차이는 실제 주간 활동량과 다를 수 있으며, 비교 자료가 없으면 증감도 미확보입니다. 주간 집계 예정 시각은 월요일 오전 9시(KST)이며 실제 완료 여부는 기록 기준일로 확인하는 방식입니다.",
      "buttons": [
        {
          "label": "SNS 기록 보기 ↗",
          "href": "sns.html"
        },
        {
          "label": "통계 오류 문의",
          "next": "inquiry_error"
        }
      ]
    },
    "reply_faq": {
      "title": "견적·회신 안내",
      "keywords": [
        "견적",
        "비용",
        "가격",
        "회신",
        "답변 언제",
        "기간",
        "연락처"
      ],
      "answer": "제작 범위, 비용, 일정과 회신 예상 기간은 아직 확정된 안내가 없는 항목입니다. 원하는 작업과 일정을 문의 내용에 작성하면 관리자가 검토할 수 있는 구성입니다. 자동 견적이나 회신 기한을 보장하는 서비스는 아닙니다.",
      "buttons": [
        {
          "label": "제작·협업 문의",
          "next": "inquiry"
        }
      ]
    },
    "inquiry": {
      "title": "제작·협업 문의",
      "keywords": [
        "문의",
        "상담",
        "협업",
        "연락",
        "관리자"
      ],
      "answer": "관심 있는 문의 유형을 선택하는 메뉴입니다. 개인정보 동의 후 접수하는 방식이며, 온라인 접수가 활성화된 경우에만 실제 전송이 가능한 구성입니다.",
      "buttons": [
        {
          "label": "콘텐츠 제작 문의",
          "next": "inquiry_content"
        },
        {
          "label": "웹페이지 제작 문의",
          "next": "inquiry_web"
        },
        {
          "label": "협업 제안",
          "next": "inquiry_collab"
        },
        {
          "label": "사이트·데이터 오류",
          "next": "inquiry_error"
        },
        {
          "label": "기타 문의",
          "next": "inquiry_other"
        },
        {
          "label": "문의 페이지 열기 ↗",
          "href": "contact.html"
        }
      ]
    },
    "inquiry_content": {
      "title": "콘텐츠 제작 문의",
      "keywords": [
        "콘텐츠 제작 문의",
        "영상 제작 문의",
        "카드뉴스 문의"
      ],
      "answer": "콘텐츠 제작 문의를 작성하는 화면입니다. 제작 범위와 참고 자료, 희망 일정을 함께 남길 수 있는 양식입니다.",
      "form": "content",
      "buttons": [
        {
          "label": "다른 문의 유형",
          "next": "inquiry"
        }
      ]
    },
    "inquiry_web": {
      "title": "웹페이지 제작 문의",
      "keywords": [
        "웹 제작",
        "웹페이지 제작",
        "웹사이트 제작",
        "홈페이지 제작"
      ],
      "answer": "웹페이지 제작 문의를 작성하는 화면입니다. 필요한 페이지와 기능, 희망 일정을 남길 수 있는 양식입니다.",
      "form": "web",
      "buttons": [
        {
          "label": "다른 문의 유형",
          "next": "inquiry"
        }
      ]
    },
    "inquiry_collab": {
      "title": "협업 제안",
      "keywords": [
        "협업 제안",
        "협업 문의",
        "함께 작업"
      ],
      "answer": "협업 제안을 작성하는 화면입니다. 제안 목적과 함께하고 싶은 작업을 남길 수 있는 양식입니다.",
      "form": "collaboration",
      "buttons": [
        {
          "label": "다른 문의 유형",
          "next": "inquiry"
        }
      ]
    },
    "inquiry_error": {
      "title": "사이트·데이터 오류 문의",
      "keywords": [
        "오류",
        "버그",
        "잘못",
        "틀렸",
        "고장"
      ],
      "answer": "사이트나 데이터 오류를 알려주는 양식입니다. 문제가 발생한 페이지와 상황을 작성하면 확인에 도움이 되는 정보입니다.",
      "form": "error",
      "buttons": [
        {
          "label": "다른 문의 유형",
          "next": "inquiry"
        }
      ]
    },
    "inquiry_other": {
      "title": "기타 문의",
      "keywords": [
        "기타 문의",
        "자료 이용 문의"
      ],
      "answer": "기타 문의를 작성하는 화면입니다. 회신받을 이메일과 문의 내용을 작성하는 양식입니다.",
      "form": "other",
      "buttons": [
        {
          "label": "다른 문의 유형",
          "next": "inquiry"
        }
      ]
    },
    "fallback": {
      "title": "등록된 안내 없음",
      "keywords": [],
      "answer": "등록된 안내를 찾지 못했어요. 아래 메뉴를 선택하거나 제작 문의를 남겨주세요.",
      "buttons": [
        {
          "label": "포트폴리오 둘러보기",
          "next": "portfolio"
        },
        {
          "label": "프로젝트 안내",
          "next": "projects"
        },
        {
          "label": "자주 묻는 질문",
          "next": "faq"
        },
        {
          "label": "제작·협업 문의",
          "next": "inquiry"
        }
      ]
    }
  }
};
window.RAON_INQUIRY_CONFIG = {
  "enabled": false,
  "supabaseUrl": "",
  "publishableKey": "",
  "table": "",
  "privacyVersion": "",
  "retention": "",
  "privacyContact": "",
  "categories": {
    "content": "콘텐츠 제작",
    "web": "웹페이지 제작",
    "collaboration": "협업 제안",
    "error": "사이트·데이터 오류",
    "other": "기타 문의"
  }
};
