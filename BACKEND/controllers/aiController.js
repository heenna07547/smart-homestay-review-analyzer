const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const summarizeReview = async (req, res) => {
  try {
    const { review } = req.body;

    if (!review) {
      return res.status(400).json({
        success: false,
        message: "Review is required",
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: `Summarize this hotel review in 2-3 sentences:\n\n${review}`,
    });

    res.status(200).json({
      success: true,
      summary: response.candidates[0].content.parts[0].text,
    });

  } catch (error) {
    console.error("Gemini Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to generate summary.",
    });
  }
};

module.exports = { summarizeReview };