import Stepper from '../components/Steps/Stepper';

const StepsPlay = () => {
  const steps = [
    { key: 'step1', label: '유형 선택' },
    { key: 'step2', label: 'Shipping' },
    { key: 'step3', label: 'Payment' },
    { key: 'step4', label: 'Review' },
    { key: 'step5', label: '감사요' },
  ];

  const steps2 = [
    { key: 'step1', label: '유형 선택' },
    { key: 'step2', label: '정보 입력' },
    { key: 'step3', label: '완료' },
  ];

  return (
    <div
      style={{ padding: 24, backgroundColor: '#f5f5f5', minHeight: '100vh' }}
    >
      <h2 style={{ fontFamily: 'Inter, sans-serif', marginBottom: 32 }}>
        Steps Component
      </h2>

      <div
        style={{
          backgroundColor: 'white',
          padding: 24,
          borderRadius: 8,
          marginBottom: 24,
        }}
      >
        <div style={{ marginBottom: 16, fontWeight: 600 }}>원본</div>
        <Stepper steps={steps} activeIndex={0} />
      </div>

      <div
        style={{
          backgroundColor: 'white',
          padding: 24,
          borderRadius: 8,
          marginBottom: 24,
        }}
      >
        <div style={{ marginBottom: 16, fontWeight: 600 }}>
          0 — Active index = 0 (1번 진행중)
        </div>
        <Stepper steps={steps2} activeIndex={0} />
      </div>

      <div
        style={{
          backgroundColor: 'white',
          padding: 24,
          borderRadius: 8,
          marginBottom: 24,
        }}
      >
        <div style={{ marginBottom: 16, fontWeight: 600 }}>
          1 — Active index = 1 (1번 완료 2번 진행)
        </div>
        <Stepper steps={steps2} activeIndex={1} />
      </div>

      <div
        style={{
          backgroundColor: 'white',
          padding: 24,
          borderRadius: 8,
          marginBottom: 24,
        }}
      >
        <div style={{ marginBottom: 16, fontWeight: 600 }}>
          2 — Active index = 2 (1번 완료 2번 완료 3번 진행)
        </div>
        <Stepper steps={steps2} activeIndex={2} />
      </div>

      <div
        style={{
          backgroundColor: 'white',
          padding: 24,
          borderRadius: 8,
          marginBottom: 24,
        }}
      >
        <div style={{ marginBottom: 16, fontWeight: 600 }}>
          3 - 전체 진행 완료
        </div>
        <Stepper steps={steps2} activeIndex={3} />
      </div>
    </div>
  );
};

export default StepsPlay;