def mostrar_menu():
    print("\n========================================")
    print("   SOFTWARE DE CÁLCULO: RELOJ ANALÓGICO")
    print("========================================")
    print("1. Grados entre Horario – Minutero")
    print("2. Grados entre Minutero – Segundero")
    print("3. Grados entre Horario – Segundero")
    print("4. Salir")
    return input("\nSeleccione una opción: ")

def validar_datos():
    try:
        h = int(input("Ingrese la hora (0-12): "))
        m = int(input("Ingrese los minutos (0-59): "))
        s = int(input("Ingrese los segundos (0-59): "))
        
        if 0 <= h <= 12 and 0 <= m <= 59 and 0 <= s <= 59:
            return h, m, s
        else:
            print("\n[ERROR] Datos fuera de rango (H: 0-12, M/S: 0-59).")
            return None
    except ValueError:
        print("\n[ERROR] Por favor, ingrese solo números enteros.")
        return None

def ejecutar_programa():
    while True:
        opcion = mostrar_menu()
        
        if opcion == '4':
            print("Cerrando el programa...")
            break
            
        if opcion in ['1', '2', '3']:
            datos = validar_datos()
            if datos:
                h, m, s = datos
                # Posiciones en grados desde las 12:00
                pos_h = (h % 12) * 30 + (m * 0.5) + (s * (0.5/60))
                pos_m = (m * 6) + (s * 0.1)
                pos_s = s * 6

                if opcion == '1':
                    res = abs(pos_h - pos_m)
                    print(f"\nResultado: El ángulo Horario-Minutero es {res}°")
                elif opcion == '2':
                    res = abs(pos_m - pos_s)
                    print(f"\nResultado: El ángulo Minutero-Segundero es {res}°")
                elif opcion == '3':
                    res = abs(pos_h - pos_s)
                    print(f"\nResultado: El ángulo Horario-Segundero es {res}°")
        else:
            print("\n[ERROR] Opción no válida.")

if __name__ == "__main__":
    ejecutar_programa()