import axios from 'axios';

// 测试 GET /api 接口
describe('GET /api', () => {
  it('should return a message', async () => {
    // 发送 GET 请求到 /api 端点
    const res = await axios.get(`/api`);

    // 验证响应状态码是否为 200
    expect(res.status).toBe(200);
    // 验证返回的数据是否符合预期
    expect(res.data).toEqual({ message: 'Hello API' });
  });
});
