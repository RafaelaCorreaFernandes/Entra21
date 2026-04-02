package desvioCondicional;
import java.util.Scanner;

public class DesvioCondicional {
	public static void main(String[] args) {
		
		//exercicio1();	
		 exercicio2();
	     }

	static void exercicio1() {
		Scanner entradaUser = new Scanner (System.in);
			
			System.out.println("Informe um número ");
			int numero = entradaUser.nextInt();
			
			if(numero % 2 == 0) {
				System.out.println("par ");
			}
			
			else {
				System.out.println("impar ");
			}
	        
		}
	
	static void exercicio2() {
		Scanner entradaUser = new Scanner (System.in);
		
		System.out.println("informe o primeiro numero ");
		int numero1 = entradaUser.nextInt();
		System.out.println("informe o segundo numero ");
		int numero2 = entradaUser.nextInt();
		
		if (numero1 > numero2) {
			System.out.println(numero1 + " é maior que " + numero2);
			}
		
		if (numero1 < numero2) {
			System.out.println(numero1 + " é menor que " + numero2);
		}
	}
	
	
	
	
	
	
	
	
	
 
}
