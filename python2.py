from transformers import BlenderbotSmallTokenizer, BlenderbotSmallForConditionalGeneration
import sys
# Initialize the Blenderbot-Small tokenizer and model
tokenizer = BlenderbotSmallTokenizer.from_pretrained("facebook/blenderbot-90M")
model = BlenderbotSmallForConditionalGeneration.from_pretrained("facebook/blenderbot-90M")

# Example input
prompt = sys.stdin.read().strip()
input_text = prompt

# Encode the input text
input_ids = tokenizer.encode(input_text, return_tensors="pt", max_length=1024, truncation=True)

# Generate a response
output = model.generate(input_ids, max_length=100, num_return_sequences=1, no_repeat_ngram_size=3)

response = tokenizer.decode(output[0], skip_special_tokens=True)
print(response)
