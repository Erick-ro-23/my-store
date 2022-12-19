word_without_vowels = ""
user_word = input("Ingresa una palabra: ")
user_word = user_word.upper()
for letter in user_word:
    # Completa el cuerpo del bucle for.
    if letter == "A":
        continue
    elif letter == "E":
        continue
    elif letter == "I":
        continue
    elif letter == "O":
        continue
    elif letter == "U":
        continue
    else:
        word_without_vowels += letter
print(word_without_vowels)