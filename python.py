from transformers import AutoModelForCausalLM, AutoTokenizer
import torch
import sys

tokenizer = AutoTokenizer.from_pretrained("microsoft/DialoGPT-medium")
model = AutoModelForCausalLM.from_pretrained("microsoft/DialoGPT-medium")

# Read the user input from stdin
prompt = sys.stdin.read().strip()

# Encode the user input, add the eos_token, and return a tensor in PyTorch
user_input_ids = tokenizer.encode(prompt + tokenizer.eos_token, return_tensors='pt')

# Generate a response while limiting the total chat history to 1000 tokens
chat_history_ids = model.generate(user_input_ids, max_length=1000, pad_token_id=tokenizer.eos_token_id)

# Extract and print the generated response
generated_text = tokenizer.decode(chat_history_ids[:, user_input_ids.shape[-1]:][0], skip_special_tokens=True)
print(generated_text)
