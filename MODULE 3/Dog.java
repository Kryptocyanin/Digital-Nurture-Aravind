public class Dog extends Animal {
    @Override
    public void makeSound() {
        System.out.println("Bark");
    }
    public static void main(String[] args) {
        Animal myAnimal = new Animal();
        Dog myDog = new Dog();
        myAnimal.makeSound();
        myDog.makeSound();
    }
}