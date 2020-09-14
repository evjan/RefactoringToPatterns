package descriptors;

import java.lang.reflect.Type;

public abstract class AttributeDescriptor {
    private final String name;
    private final Class<? extends ClientCode> klass;
    private final Type type;

    protected AttributeDescriptor(String name, Class<? extends ClientCode> klass, Type type){

        this.name = name;
        this.klass = klass;
        this.type = type;
    }

    public String toString() {
        return name;
    }
}
