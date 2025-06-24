const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

export async function guessRecipeDetails(title) {
    try {
        const prompt = `Extract detailed ingredients and step-by-step instructions from this recipe title: "${title}". Respond in this format:\n\nIngredients:\n- item1\n- item2\n\nSteps:\n1. step one\n2. step two`;

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "http://localhost:5173"  // Important!
            },
            body: JSON.stringify({
                model: "mistralai/mistral-7b-instruct",  // Or try "openchat/openchat-3.5-0106"
                messages: [
                    {
                        role: "user",
                        content: prompt
                    }
                ]
            })
        });

        const result = await response.json();
        const output = result?.choices?.[0]?.message?.content || "";

        const ingredientsMatch = output.match(/Ingredients:\n([\s\S]*?)\n\n/);
        const stepsMatch = output.match(/Steps:\n([\s\S]*)/);

        const ingredients = ingredientsMatch?.[1]
            .split("\n")
            .map(line => line.replace(/^[-•\s]+/, "").trim())
            .filter(Boolean) || [];

        const steps = stepsMatch?.[1]
            .split("\n")
            .map(step => step.replace(/^\d+\.\s*/, "").trim())
            .filter(Boolean) || [];

        return { ingredients, steps };
    } catch (err) {
        console.warn("⚠️ OpenRouter AI Error:", err);
        return { ingredients: [], steps: [] };
    }
}
