uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

attribute vec3 position;
attribute float aRandom;

varying float vRandom;

void main(){
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    //modelPosition.x += 0.4;
    //modelPosition.z += 0.2 * sin(modelPosition.x * 10.0);
    modelPosition.z += 0.1 * aRandom;
    vec4 view = viewMatrix * modelPosition;
    vec4 projection = projectionMatrix * view;
    gl_Position = projection;

    vRandom = aRandom;
}