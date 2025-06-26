export async function translateText(textArray, targetLang = "hi") {
    const text = textArray.join("\n");

    try {
        const response = await fetch("https://libretranslate.com/translate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                q: text,
                source: "en",
                target: targetLang,
                format: "text"
            })
        });

        if (!response.ok) {
            console.warn("❌ LibreTranslate error:", response.statusText);
            return textArray; // fallback
        }

        const data = await response.json();
        return data.translatedText.split("\n"); // return array again
    } catch (err) {
        console.warn("❌ LibreTranslate error:", err);
        return textArray;
    }
}
