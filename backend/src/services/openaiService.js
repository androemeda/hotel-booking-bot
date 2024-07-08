const OpenAI = require('openai');
require('dotenv').config();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const functions = [
  {
    name: 'getRooms',
    description: 'Get available hotel rooms',
    parameters: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'bookRoom',
    description: 'Book a hotel room',
    parameters: {
      type: 'object',
      properties: {
        roomId: { type: 'number' },
        fullName: { type: 'string' },
        email: { type: 'string' },
        nights: { type: 'number' },
      },
      required: ['roomId', 'fullName', 'email', 'nights'],
    },
  },
];

async function getChatbotResponse(messages) {
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: 'You are a hotel booking assistant. Only answer questions related to hotel bookings and room information. If asked about anything else, politely redirect the conversation back to hotel bookings.',
      },
      ...messages,
    ],
    functions: functions,
    function_call: 'auto',
  });

  return response.choices[0].message;
}

module.exports = {
  getChatbotResponse,
};