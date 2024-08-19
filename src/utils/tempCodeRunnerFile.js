      await client.bot.sendMessage('-4230082874', {
        message: alerts.slotOpen,
        replyMarkup: new Api.ReplyInlineMarkup(buttons), // Make sure `buttons` is properly imported or defined
      });