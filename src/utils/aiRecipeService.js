const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

export async function generateRecipeFromIngredients(recipeName) {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        },
        body: JSON.stringify({
            model: "mistralai/mistral-7b-instruct", // ✅ switch from gpt-3.5
            messages: [
                {
                    role: "user",
                    content: `Generate a recipe for "${recipeName}" in the format:

🍅 Ingredients:
(List all ingredients)

📝 Steps:
(List cooking steps in numbered format)`
                }
            ]
        }),
    });

    const data = await response.json();
    console.log("🟡 AI raw response:", data);

    if (!data.choices || !data.choices[0]?.message?.content) {
        console.error("🔴 Error in response:", data);
        throw new Error("Invalid AI response");
    }

    return data.choices[0].message.content;
}
