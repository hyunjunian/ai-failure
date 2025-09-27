import { useState } from 'react';
import { Brain, BarChart3, Lightbulb, FileText, Zap } from 'lucide-react';

interface FailureScenario {
  id: string;
  category: string;
  description: string;
  probability: number;
  impact: string;
  keyFactors: string[];
}

interface FailureStory {
  id: string;
  title: string;
  category: string;
  summary: string;
  lessons: string[];
  timestamp: string;
}

interface AICoachResponse {
  emotional: string;
  analytical: string;
  suggestions: string[];
}

export default function WrongAnswerNote() {
  const [activeTab, setActiveTab] = useState('simulator');
  const [userInput, setUserInput] = useState('');
  const [failureScenarios, setFailureScenarios] = useState<FailureScenario[]>([]);
  const [failureStories, setFailureStories] = useState<FailureStory[]>([
    {
      id: '1',
      title: '스타트업 첫 제품 출시 실패',
      category: '창업',
      summary: '6개월간 개발한 앱이 출시 첫 주에 사용자 10명도 확보하지 못했습니다.',
      lessons: ['시장 검증 부족', '사용자 니즈 파악 미흡', '마케팅 전략 부재'],
      timestamp: '2025-09-15'
    },
    {
      id: '2',
      title: '연구 프로젝트 가설 검증 실패',
      category: '연구',
      summary: '1년간 진행한 연구에서 핵심 가설이 완전히 틀렸음을 발견했습니다.',
      lessons: ['초기 문헌 조사 부족', '실험 설계의 한계', '동료 검토 과정 생략'],
      timestamp: '2025-09-20'
    }
  ]);
  const [newStory, setNewStory] = useState({ title: '', category: '', summary: '', lessons: '' });
  const [aiCoachResponse, setAiCoachResponse] = useState<AICoachResponse | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateFailureScenarios = async () => {
    if (!userInput.trim()) return;

    setIsGenerating(true);

    // Simulate AI processing
    setTimeout(() => {
      const scenarios: FailureScenario[] = [
        {
          id: '1',
          category: '시장 분석 실패',
          description: `${userInput}에 대한 시장 수요 예측이 과대평가되어 실제 고객 확보에 실패할 가능성`,
          probability: 65,
          impact: '높음',
          keyFactors: ['타겟 고객층 분석 부족', '경쟁사 분석 미흡', '시장 트렌드 오판']
        },
        {
          id: '2',
          category: '기술 구현 실패',
          description: `${userInput} 개발 과정에서 기술적 한계나 예상치 못한 복잡성으로 인한 구현 실패`,
          probability: 45,
          impact: '중간',
          keyFactors: ['기술 스택 선택 오류', '개발 일정 과소평가', '팀 역량 부족']
        },
        {
          id: '3',
          category: '사용자 경험 실패',
          description: `${userInput}의 사용자 인터페이스나 경험이 기대에 못 미쳐 사용자 이탈 발생`,
          probability: 55,
          impact: '높음',
          keyFactors: ['사용자 테스트 부족', 'UI/UX 설계 미흡', '접근성 고려 부족']
        },
        {
          id: '4',
          category: '자원 관리 실패',
          description: `${userInput} 프로젝트의 예산, 인력, 시간 관리 실패로 인한 중도 포기`,
          probability: 40,
          impact: '중간',
          keyFactors: ['예산 계획 부실', '인력 배치 오류', '일정 관리 미흡']
        }
      ];

      setFailureScenarios(scenarios);
      setIsGenerating(false);
    }, 2000);
  };

  const addFailureStory = () => {
    if (!newStory.title || !newStory.summary) return;

    const story: FailureStory = {
      id: Date.now().toString(),
      title: newStory.title,
      category: newStory.category || '기타',
      summary: newStory.summary,
      lessons: newStory.lessons.split(',').map(l => l.trim()).filter(l => l),
      timestamp: new Date().toISOString().split('T')[0]
    };

    setFailureStories([story, ...failureStories]);
    setNewStory({ title: '', category: '', summary: '', lessons: '' });
  };

  const getAICoaching = (story: FailureStory) => {
    const response: AICoachResponse = {
      emotional: "실패는 성장의 필수 과정입니다. 당신의 도전 정신과 용기를 인정합니다. 이 경험이 더 나은 결과를 위한 소중한 자산이 될 것입니다.",
      analytical: `${story.category} 분야에서 ${story.lessons.length}개의 핵심 교훈을 도출하신 것은 매우 의미있는 성과입니다. 특히 '${story.lessons[0]}'는 많은 유사 사례에서 공통적으로 나타나는 패턴입니다.`,
      suggestions: [
        "유사한 실패 사례 3건을 추가 분석하여 패턴을 파악해보세요",
        "실패 요인을 체크리스트로 만들어 향후 프로젝트에 활용하세요",
        "동료들과 실패 경험을 공유하여 집단 지혜를 구축하세요",
        "실패로부터 얻은 인사이트를 새로운 아이디어 발굴에 활용하세요"
      ]
    };

    setAiCoachResponse(response);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-neutral-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center space-x-3">
                <div className="bg-indigo-600 p-2 rounded-lg">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">오답노트 2.0</h1>
                  <p className="text-sm text-gray-600">AI 실패 데이터 기반 창의성 촉진 플랫폼</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">전현준</p>
                  <p className="text-xs text-gray-500">KAIST</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Navigation */}
        <nav className="bg-white border-b border-neutral-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveTab('simulator')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'simulator'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4" />
                  <span>AI 실패 시뮬레이터</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('archive')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'archive'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <span>실패 회고록 아카이브</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('analysis')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'analysis'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                <div className="flex items-center space-x-2">
                  <BarChart3 className="h-4 w-4" />
                  <span>교차분석 & 아이디어 융합</span>
                </div>
              </button>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'simulator' && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">AI 실패 시뮬레이터</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  당신의 아이디어나 프로젝트를 입력하면, AI가 수만 가지 실패 시나리오를 시뮬레이션하여
                  잠재적 리스크와 개선점을 미리 발견할 수 있도록 도와드립니다.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      아이디어 또는 프로젝트 설명
                    </label>
                    <textarea
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      placeholder="예: 대학생을 위한 AI 기반 학습 관리 앱 개발"
                      className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                    />
                  </div>
                  <button
                    onClick={generateFailureScenarios}
                    disabled={isGenerating || !userInput.trim()}
                    className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>AI가 실패 시나리오를 생성 중...</span>
                      </>
                    ) : (
                      <>
                        <Lightbulb className="h-5 w-5" />
                        <span>실패 시나리오 생성하기</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {failureScenarios.length > 0 && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900">생성된 실패 시나리오</h3>
                  <div className="grid gap-6 md:grid-cols-2">
                    {failureScenarios.map((scenario) => (
                      <div key={scenario.id} className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex items-start justify-between mb-4">
                          <h4 className="text-xl font-semibold text-indigo-700">{scenario.category}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${scenario.impact === '높음' ? 'bg-red-200 text-red-800' : 'bg-yellow-200 text-yellow-800'}`}>{scenario.impact}</span>
                        </div>
                        <p className="text-gray-700 mb-3">{scenario.description}</p>
                        <p className="text-sm font-medium text-gray-900 mb-1">발생 확률: {scenario.probability}%</p>
                        <p className="text-sm font-medium text-gray-900 mb-2">핵심 요인:</p>
                        <ul className="list-disc list-inside text-gray-700">
                          {scenario.keyFactors.map((factor, idx) => (
                            <li key={idx}>{factor}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'archive' && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">실패 회고록 아카이브</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  익명으로 자신의 실패 경험을 기록하고 공유하며, AI 코칭을 통해 회복과 재도전을 지원합니다.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">제목</label>
                    <input
                      type="text"
                      value={newStory.title}
                      onChange={(e) => setNewStory({ ...newStory, title: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="실패 경험 제목"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">분야</label>
                    <input
                      type="text"
                      value={newStory.category}
                      onChange={(e) => setNewStory({ ...newStory, category: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="예: 창업, 연구, 기타"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">요약</label>
                    <textarea
                      value={newStory.summary}
                      onChange={(e) => setNewStory({ ...newStory, summary: e.target.value })}
                      className="w-full h-24 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                      placeholder="실패 경험에 대한 간단한 설명"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">주요 교훈 (쉼표로 구분)</label>
                    <input
                      type="text"
                      value={newStory.lessons}
                      onChange={(e) => setNewStory({ ...newStory, lessons: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="예: 시장 검증 부족, 팀워크 문제, 일정 관리 실패"
                    />
                  </div>
                  <button
                    onClick={addFailureStory}
                    className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700"
                  >
                    실패 회고록 추가하기
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900">기존 실패 회고록</h3>
                {failureStories.length === 0 ? (
                  <p className="text-gray-600">아직 등록된 실패 회고록이 없습니다.</p>
                ) : (
                  <ul className="space-y-4">
                    {failureStories.map((story) => (
                      <li key={story.id} className="bg-white rounded-xl shadow p-6">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="text-xl font-semibold text-indigo-700">{story.title}</h4>
                          <span className="text-sm text-gray-500">{story.timestamp}</span>
                        </div>
                        <p className="text-gray-700 mb-2">{story.summary}</p>
                        <p className="text-sm font-medium text-gray-900 mb-1">주요 교훈:</p>
                        <ul className="list-disc list-inside text-gray-700 mb-2">
                          {story.lessons.map((lesson, idx) => (
                            <li key={idx}>{lesson}</li>
                          ))}
                        </ul>
                        <button
                          onClick={() => getAICoaching(story)}
                          className="text-indigo-600 hover:underline text-sm"
                        >
                          AI 코칭 받기
                        </button>
                      </li>
                    ))}
                  </ul>
                )}

                {aiCoachResponse && (
                  <div className="mt-8 bg-indigo-50 border border-indigo-200 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-indigo-700 mb-2">AI 실패 코칭</h4>
                    <p className="mb-2"><strong>감정적 위로:</strong> {aiCoachResponse.emotional}</p>
                    <p className="mb-2"><strong>분석적 피드백:</strong> {aiCoachResponse.analytical}</p>
                    <p className="mb-2"><strong>제안:</strong></p>
                    <ul className="list-disc list-inside text-indigo-700">
                      {aiCoachResponse.suggestions.map((suggestion, idx) => (
                        <li key={idx}>{suggestion}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'analysis' && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">교차분석 & 아이디어 융합</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  AI 실패 시뮬레이터와 실패 회고록 아카이브의 데이터를 교차 분석하여 새로운 통찰과 창의적 아이디어를 도출합니다.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-indigo-700 mb-6">AI 실패 시뮬레이터 요약</h3>
                {failureScenarios.length === 0 ? (
                  <p className="text-gray-600">생성된 실패 시나리오가 없습니다. AI 실패 시뮬레이터 탭에서 시나리오를 생성해보세요.</p>
                ) : (
                  <ul className="list-disc list-inside text-gray-700 mb-6">
                    {failureScenarios.map((scenario) => (
                      <li key={scenario.id}>
                        <strong>{scenario.category}:</strong> {scenario.description} (확률: {scenario.probability}%, 영향: {scenario.impact})
                      </li>
                    ))}
                  </ul>
                )}

                <h3 className="text-2xl font-bold text-indigo-700 mb-6">실패 회고록 아카이브 요약</h3>
                {failureStories.length === 0 ? (
                  <p className="text-gray-600">등록된 실패 회고록이 없습니다.</p>
                ) : (
                  <ul className="list-disc list-inside text-gray-700 mb-6">
                    {failureStories.map((story) => (
                      <li key={story.id}>
                        <strong>{story.title} ({story.category}):</strong> {story.summary}
                      </li>
                    ))}
                  </ul>
                )}

                <h3 className="text-2xl font-bold text-indigo-700 mb-4">통합 인사이트 및 제안</h3>
                <p className="text-gray-700 mb-4">
                  AI가 생성한 실패 시나리오와 인간의 실패 회고록 데이터를 교차 분석한 결과, 기술적 실패뿐만 아니라 사회적, 문화적 맥락에서의 실패 요인도 함께 고려하는 것이 중요하다는 점이 도출되었습니다. 이를 바탕으로 다음과 같은 창의적 아이디어 융합 방안을 제안합니다.
                </p>
                <ul className="list-disc list-inside text-gray-700">
                  <li>실패 시나리오별 핵심 요인을 팀 내 워크숍에서 심층 토론하여 새로운 해결책을 모색합니다.</li>
                  <li>실패 회고록의 교훈을 바탕으로 체크리스트를 개발하여 프로젝트 리스크 관리를 강화합니다.</li>
                  <li>AI와 인간의 실패 데이터를 통합한 대시보드를 구축하여 실시간 모니터링 및 의사결정 지원에 활용합니다.</li>
                  <li>실패 경험 공유를 장려하는 커뮤니티를 활성화하여 집단 지성을 통한 혁신을 촉진합니다.</li>
                </ul>
              </div>
            </div>
          )}
        </main>
      </div>
      <footer className="bg-white border-t border-neutral-200 text-center text-sm text-gray-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          실패는 끝이 아닙니다. 상상력을 위한 첫 번째 데이터입니다. | 2025 오답노트 2.0 &copy; All rights reserved.
        </div>
      </footer>
    </>
  );
}