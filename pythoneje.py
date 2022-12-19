# El devorador de vocalea Feo
# Indicar al usuario que ingrese una palabra
# y asignarlo a la variable user_word.
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
        print(letter, "\n")

# El devorador de vocalea Feo:
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
# piramide de cajas:
blocks = int(input("Ingresa el número de bloques: "))

heigth = 0
for block in blocks:
    block += 1


#
# Escribe tu código aquí.
#

print("La altura de la pirámide:", height)
