import Text from '../components/Texts/Text';
import Label from '../components/Inputs/Label';

const TextsPlay = () => {
  return (
    <div style={{ padding: 20 }}>
      <Text variant="header">로그인</Text>
      <div style={{ height: 12 }} />
      <Text variant="content">사람이 곧 기업의 경쟁력입니다.</Text>
      <div style={{ height: 12 }} />
      <Label htmlFor="example">아이디 찾기</Label>
      <div style={{ height: 12 }} />
      <Text variant="link" href="#">· 채용 공고 및 인재 요건 등록</Text>
    </div>
  );
};

export default TextsPlay;
