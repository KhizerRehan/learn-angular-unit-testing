import { MessageService } from "./message.service";

describe("MessageService", () => {
  let service: MessageService;
  beforeEach(() => {
    service = new MessageService();
  });

  it("should have no messages at start", () => {
    expect(service.messages.length).toBe(0);
  });

  it("should have add a message when add is called", () => {
    service.add("mewMessage");
    expect(service.messages.length).toBe(1);
  });

  it("should clear messages when clear is called", () => {
    service.add("mewMessage");
    service.clear();
    expect(service.messages.length).toBe(0);
  });
});
