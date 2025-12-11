import Text from '../components/Texts/Text';

const TextsPlay = () => {
  return (
    <div style={{ padding: 20 }}>
      <h3>header</h3>
      <Text variant="header">로그인</Text>
      <div style={{ height: 12 }} />
      <h3>content</h3>
      <Text variant="content">사람이 곧 기업의 경쟁력입니다.</Text>
      <div style={{ height: 12 }} />
      <h3>link</h3>
      <Text variant="link" href="#">
        아이디 찾기
      </Text>
      <div style={{ height: 12 }} />
      <h3>link</h3>
      <Text variant="link" href="#">
        · 채용 공고 및 인재 요건 등록
      </Text>
      <div />
      <h3>title</h3>
      <Text variant="title">후보자 등록</Text>
    </div>
  );
};

export default TextsPlay;
