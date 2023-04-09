import {MessageService} from "./message.service";

describe('MessageService Spec', () => {
  let service: MessageService;

  beforeEach(() => {
    service = new MessageService();
  })

  it('should have no messages to start', () => {
    expect(service.messages.length).toBe(0);
  });

  it('should should add a messages when add is called', () => {
    service.add("Inserted Message-1");
    service.add("Inserted Message-2");

    expect(service.messages.length).toBe(2);
  });


  it('should should remove all messages when clear is called', () => {
    service.add("Inserted Message-1");
    service.add("Inserted Message-2");

    expect(service.messages.length).toBe(2);

    service.clear();

    expect(service.messages.length).toBe(0);
  });

});
