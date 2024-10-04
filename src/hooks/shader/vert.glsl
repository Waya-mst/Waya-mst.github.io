// precision highp float;

uniform vec3 uColor;
uniform vec2 uMouse;
uniform float uTime;

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

attribute vec3 position;
attribute float aRandom;
attribute float saruRandom;

varying float vRandom;
varying float sarumodelRandom;

void main(){


    vec3 newPosition = position;
    newPosition.x += uMouse.x * 1.7;
    newPosition.y -= uMouse.y * 1.7;

    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
    //modelPosition.x += 0.4;
    //modelPosition.z += 0.2 * sin(modelPosition.x * 10.0);
    //modelPosition.z += 0.1 * aRandom;
    vec4 view = viewMatrix * modelPosition;
    vec4 projection = projectionMatrix * view;

    
    gl_Position = projection;

    vRandom = aRandom;
    sarumodelRandom = saruRandom;
}