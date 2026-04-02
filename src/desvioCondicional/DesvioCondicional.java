package desvioCondicional;

import java.util.Scanner;

public class DesvioCondicional {
	public static void main(String[] args) {
		
		//exercicio1();	
		//exercicio2();
		exercicio3();
	
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
		
		static void exercicio3() {
		 Scanner sc = new Scanner (System.in);
		 
		 System.out.println("Informe um numero ");
		 int numero = sc.nextInt();
		 if (numero > 0) {
			 System.out.println("Esse número é positivo ");
			 }
		 if (numero < 0) {
			 System.out.println("Esse número é negativo ");
		 }
		 if (numero == 0) {
			 System.out.println("Esse número é igual a 0 ");
			 
	
			 }
		
		 
		 
		
		
	}
	
	
	
	
	
	
	
	
	
 
}
