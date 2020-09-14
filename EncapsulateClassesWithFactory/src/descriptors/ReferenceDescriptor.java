package descriptors;

import java.lang.reflect.Type;

public class ReferenceDescriptor extends AttributeDescriptor {
    private final Type type2;

    public ReferenceDescriptor(String name, Class<? extends ClientCode> klass, Type type1, Type ref2) {
        super(name, klass, type1);
        this.type2 = ref2;
    }
}
