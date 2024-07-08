const express = require('express');
const router = express.Router();
const openaiService = require('../services/openaiService');
const Conversation = require('../models/Conversation');
const { getRooms, bookRoom } = require('../utils/functionCalling');

router.post('/chat', async (req, res) => {
  try {
    const { message, userId } = req.body;

    let conversation = await Conversation.findOne({ where: { userId } });
    if (!conversation) {
      conversation = await Conversation.create({ userId, messages: [] });
    }

    const messages = [...conversation.messages, { role: 'user', content: message }];

    const openaiResponse = await openaiService.getChatbotResponse(messages);

    if (openaiResponse.function_call) {
      let functionResult;
      if (openaiResponse.function_call.name === 'getRooms') {
        functionResult = await getRooms();
      } else if (openaiResponse.function_call.name === 'bookRoom') {
        const { roomId, fullName, email, nights } = JSON.parse(openaiResponse.function_call.arguments);
        functionResult = await bookRoom(roomId, fullName, email, nights);
      }

      const functionMessage = {
        role: 'function',
        name: openaiResponse.function_call.name,
        content: JSON.stringify(functionResult),
      };

      messages.push(functionMessage);
      const secondResponse = await openaiService.getChatbotResponse(messages);
      messages.push(secondResponse);
    } else {
      messages.push(openaiResponse);
    }

    await conversation.update({ messages });

    res.json({ response: messages[messages.length - 1].content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});

module.exports = router;



// const express = require('express');
// const router = express.Router();
// const openaiService = require('../services/openaiService');
// const Conversation = require('../models/Conversation');
// const { getRooms, bookRoom } = require('../utils/functionCalling');
// const emailService = require('../services/emailService');

// router.post('/chat', async (req, res) => {
//   try {
//     const { message, userId } = req.body;

//     let conversation = await Conversation.findOne({ where: { userId } });
//     if (!conversation) {
//       conversation = await Conversation.create({ userId, messages: [] });
//     }

//     const messages = [...conversation.messages, { role: 'user', content: message }];

//     const openaiResponse = await openaiService.getChatbotResponse(messages);

//     if (openaiResponse.function_call) {
//       let functionResult;
//       if (openaiResponse.function_call.name === 'getRooms') {
//         functionResult = await getRooms();
//       } else if (openaiResponse.function_call.name === 'bookRoom') {
//         const { roomId, fullName, email, nights } = JSON.parse(openaiResponse.function_call.arguments);
//         functionResult = await bookRoom(roomId, fullName, email, nights);
//         if (functionResult.success) {
//           await emailService.sendConfirmationEmail(email, functionResult.booking);
//         }
//       }

//       const functionMessage = {
//         role: 'function',
//         name: openaiResponse.function_call.name,
//         content: JSON.stringify(functionResult),
//       };

//       messages.push(functionMessage);
//       const secondResponse = await openaiService.getChatbotResponse(messages);
//       messages.push(secondResponse);
//     } else {
//       messages.push(openaiResponse);
//     }

//     await conversation.update({ messages });

//     res.json({ response: messages[messages.length - 1].content });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'An error occurred while processing your request.' });
//   }
// });

// module.exports = router;