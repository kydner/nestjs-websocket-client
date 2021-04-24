const app = new Vue({
  el: '#app',
  data: {
    title: 'Nestjs Websockets Chat',
    name: '',
    text: '',
    messages: [],
    socket: null,
  },
  methods: {
    sendMessage() {
      if (this.validateInput()) {
        const message = {
          name: this.name,
          text: this.text,
        };
        this.socket.emit('msg_send', message);
        this.text = '';
      }
    },
    receivedMessage(message) {
      this.messages.push(message);
    },
    validateInput() {
      return this.name.length > 0 && this.text.length > 0;
    },
  },
  created() {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InN0cmluZyIsInVzZXJJZCI6ImEzYjE1MTIxLWYxM2UtNDBmOC1hOGZmLTk5ODlkMjFlNmY1OSIsImZpcnN0TmFtZSI6InN0cmluZyIsImxhc3ROYW1lIjoic3RyaW5nIiwiZW1haWwiOiJzdHJpbmdAc3RyaW5nLmNvbSIsImlhdCI6MTYxOTIzMDM5OH0.xQCMj6dG--rP-y7OnJl4GOzh_bGnLQLolDLQogKj_9U';
    this.socket = io('http://localhost:8000', {
      query: {
        token,
      },
    });
    this.socket.on('msg_receive', (message) => {
      this.receivedMessage(message);
    });
  },
});
