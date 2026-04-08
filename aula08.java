import java.util.Scanner;

public class aula08 {

	public static void main(String[] args) {

		
		String[] cars = {"Volvo", "BMW", "Ford", "Mazda"};
		
		//System.out.println(cars[0]);
		//System.out.println(cars[2]);
		
		cars[2] = "Chevrolet";
		//System.out.println(cars[2]);
		
		System.out.println("");
		//for indexado
		for(int i = 0; i < cars.length; i++) {
			// System.out.println(i + " -> " + cars[i]);
		}
		 System.out.println("");
		 int x = 0;
		 while(x < cars.length) {
			// System.out.println(x + " -> " + cars[x]);
			 x++;
		 }
		 
		 //nao indexado
		// System.out.println("");
		 for(String c : cars ) {
			 //System.out.println(c);
		 }
		 
	
		 
		 //desafioDobro();
		 parImpar();
	}
		
		 static void desafioDobro () {
			Scanner input = new Scanner(System.in);
			int[] numeros = new int[5];
			
			for(int i = 0; i < numeros.length; i++) {
				System.out.println("Informe numero: ");
				numeros[i] = input.nextInt();
			}
			
			for(int n : numeros) {
				System.out.println(n + n);
			}			 
		 }

		 static void parImpar() {
			 Scanner input = new Scanner(System.in);
			 int[] numeros = new int[10];
			 
			 for(int i = 0; i < numeros.length; i++) {
				 System.out.println("Informe numero: ");
				 numeros[i] = input.nextInt();
			 }
			 
			for(int num : numeros) {
				if(num % 2 == 0) {
					System.out.println(num + " par");
				}
				else {
					System.out.println(num + " impar");
				}
			}
			 
			
			 }
			 
			 
			 
		
			  
		 }
	

	

	
	
	

		 
		 
		 
		
	



