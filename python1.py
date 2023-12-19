import sys
from transformers import GPT2Tokenizer, GPT2LMHeadModel

# Load the pre-trained GPT-2 model and tokenizer
model_name = "gpt2"

# Load model directly

tokenizer = GPT2Tokenizer.from_pretrained("gpt2")
model = GPT2LMHeadModel.from_pretrained("gpt2")
# Get the prompt from the command line arguments
prompt = sys.stdin.read().strip()
# Tokenize the input text
input_ids = tokenizer.encode(prompt, return_tensors="pt")

# Generate text
output = model.generate(input_ids, max_length=100, num_return_sequences=1, no_repeat_ngram_size=2, top_k=50, top_p=0.95)

# Decode and print the generated text
generated_text = tokenizer.decode(output[0], skip_special_tokens=True)
print(generated_text)



